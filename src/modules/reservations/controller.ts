import { Response } from "express";
import dotenv from "dotenv";
import ReservationService from "./service";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import handleResponse from "../../middlewares/handleResponse";
import StaffService from "../staff/service";
import sequelize, { Op } from "sequelize";
import moment from "moment";
import getDates from "../../utils/getAllDatesBetweenTwoDates";
import calculateOverstayFee from "../../utils/calculateOverstayAmount";

dotenv.config();

class ReservationController {
  static async reserveRoom(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const {
        first_name,
        last_name,
        room_type,
        amount_paid,
        checkout_time,
        room_number,
        email,
        phone_number,
      } = req.body;
      const staff = req.staff;
      let customer = await StaffService.findOneCustomer({
        phone_number,
      });
      if (!customer) {
        customer = await StaffService.createCustomer({
          first_name,
          last_name,
          email,
          phone_number,
        });
      }
      let reservation = await ReservationService.createReservation({
        room_type,
        amount_paid,
        checkout_time,
        room_number,
        customer_id: customer.id,
        checking_time: new Date(),
        staff_checked_in: staff?.id,
        total_amount: amount_paid,
      });

      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Reservation successfully made",
          data: reservation,
        },
        201
      );
    } catch (error: any) {
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        500
      );
    }
  }

  static async viewReservations(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { status, checking_time, checkout_time, room_type, room_number } =
        req.query;
      const query: any = {};
      if (status === "running") query.time_checked_out = null;
      else if (status === "checkedout")
        query.time_checked_out = { [Op.ne]: null };
      if (checking_time)
        query.checking_time = sequelize.where(
          sequelize.cast(sequelize.col("checking_time"), "DATE"),
          "=",
          checking_time
        );
      if (checkout_time)
        query.checkout_time = sequelize.where(
          sequelize.cast(sequelize.col("checkout_time"), "DATE"),
          "=",
          checkout_time
        );
      if (room_type) query.room_type = room_type;
      if (room_number) query.room_number = room_number;

      let reservations = await ReservationService.findAllReservations(query);

      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Reservations fetched successfully",
          data: reservations,
        },
        200
      );
    } catch (error: any) {
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        500
      );
    }
  }

  static async viewReservation(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { id } = req.params;

      let reservation = await ReservationService.findOneReservation({
        reservation_id: Number(id),
      });

      if (!reservation)
        return handleResponse(
          req,
          res,
          {
            status: "error",
            message: "Reservation does not exist",
          },
          404
        );
      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Reservation fetched successfully",
          data: reservation,
        },
        200
      );
    } catch (error: any) {
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        500
      );
    }
  }

  static async checkOutReservation(
    req: IGetUserAuthInfoRequest,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const staff = req.staff;

      let reservation = await ReservationService.findOneReservation({
        reservation_id: Number(id),
      });

      if (!reservation)
        return handleResponse(
          req,
          res,
          {
            status: "error",
            message: "Reservation does not exist",
          },
          404
        );

      if (reservation.time_checked_out)
        return handleResponse(
          req,
          res,
          {
            status: "error",
            message: "Reservation has been checked out already",
          },
          400
        );
      let overstay_cost = 0;
      if (new Date() > new Date(reservation.checkout_time)) {
        const all_dates = getDates(moment(reservation.checkout_time));
        overstay_cost = calculateOverstayFee(
          all_dates,
          reservation.room_type,
          Number(reservation.amount_paid)
        );
      }

      reservation = await ReservationService.updateReservation(reservation, {
        staff_checked_out: staff?.id,
        total_amount: Number(reservation.amount_paid) + overstay_cost,
        time_checked_out: new Date(),
      });
      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Reservation checked out successfully",
          data: reservation,
        },
        200
      );
    } catch (error: any) {
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        500
      );
    }
  }
}

export default ReservationController;
