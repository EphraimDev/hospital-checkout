import { Response, NextFunction } from "express";
import handleResponse from "./handleResponse";
import { IGetUserAuthInfoRequest } from "../../types/express";

const validateRoomType = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (!["deluxe", "regular", "palatial"].includes(req.body.room_type))
    return handleResponse(
      req,
      res,
      {
        status: "error",
        message: "Wrong room type",
      },
      400
    );

  return next();
};

export default validateRoomType;
