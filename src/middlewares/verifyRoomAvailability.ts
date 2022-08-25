import { Response, NextFunction } from "express";
import handleResponse from "./handleResponse";
import { IGetUserAuthInfoRequest } from "../../types/express";
import ReservationService from "../modules/reservations/service";

const verifyRoomAvailability = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const findRoom = await ReservationService.findOneReservation({
      room_number: req.body.room_number,
      time_checked_out: null,
    });
    if (findRoom) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "This room is currently not available",
        },
        400
      );
    }
    next();
  } catch (error: any) {
    return handleResponse(
      req,
      res,
      {
        status: "error",
        message: error.message,
      },
      500
    );
  }
};

export default verifyRoomAvailability;
