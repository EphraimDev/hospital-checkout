import { Response, NextFunction } from "express";
import handleResponse from "./handleResponse";
import { IGetUserAuthInfoRequest } from "../../types/express";

const verifySuperStaff = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req?.staff?.role !== "SUPER") {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Permission denied",
        },
        403
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

export default verifySuperStaff;
