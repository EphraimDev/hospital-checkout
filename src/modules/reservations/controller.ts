import { Response } from "express";
import dotenv from "dotenv";
import ReservationService from "./service";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import handleResponse from "../../middlewares/handleResponse";
import StaffService from "../staff/service";

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
        total_amount: amount_paid
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
}

export default ReservationController;
