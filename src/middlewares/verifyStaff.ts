import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import handleResponse from "./handleResponse";
import logger from "../utils/logger";
import { IGetUserAuthInfoRequest } from "../../types/express";
import StaffService from "../modules/staff/service";

dotenv.config();
let { JWT_SECRET_KEY } = process.env;

export interface decodepLoad {
  id: number;
  email: string;
}

const verifyStaff = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Authorization token is invalid",
        },
        401
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Authorization token is missing",
        },
        401
      );
    }

    const decoded = jwt.verify(token, <any>JWT_SECRET_KEY) as decodepLoad;

    const staff = await StaffService.findOneStaff({id:decoded.id, email: decoded.email});

    if (!staff || (staff && staff.access_token !== token)) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Failed to authenticate user",
        },
        401
      );
    }
    logger(module).info(
      `Logged in user - ${req.socket.remoteAddress}- ${req.originalUrl} - ${staff.email}`
    );
    req.staff = staff;
    next();
  } catch (error: any) {
    let message = error.message;
    let status = 500;
    if (error?.name === "TokenExpiredError") {
      message = "token expired. please login again";
      status = 401;
    } else if (error?.name === "JsonWebTokenError") {
      message = "invalid token";
      status = 401;
    }
    return handleResponse(
      req,
      res,
      {
        status: "error",
        message,
      },
      status
    );
  }
};

export default verifyStaff;
