import { Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import StaffService from "./service";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import AccessToken from "../../utils/accessToken";
import handleResponse from "../../middlewares/handleResponse";
import random from "../../utils/randomString";

dotenv.config();

class StaffController {
  static async login(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { email, password } = req.body;
      let staff = await StaffService.findOneStaff({
        email: email.trim().toLowerCase(),
      });
      if (!staff)
        return handleResponse(
          req,
          res,
          { status: "error", message: "Email or password is incorrect" },
          401
        );

      if (!staff.is_active)
        return handleResponse(
          req,
          res,
          { status: "error", message: "Staff has been deactivated" },
          400
        );

      const isPasswordCorrect = bcrypt.compareSync(password.trim(), staff.password);
      if (!isPasswordCorrect)
        return handleResponse(
          req,
          res,
          { status: "error", message: "Email or password is incorrect" },
          401
        );

      const accessToken = await AccessToken({
        id: staff.id,
        email: staff.email,
      });
      if (!accessToken)
        return handleResponse(
          req,
          res,
          {
            status: "error",
            message: "Failed to generate token. Please try again",
          },
          401
        );
      staff = await StaffService.updateStaff(staff, {
        access_token: accessToken,
        last_login: new Date(),
      });

      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Staff signed in successfully",
          data: {
            user: {
              first_name: staff.first_name,
              last_name: staff.last_name,
              id: staff.id,
              email: staff.email,
              phone_number: staff.phone_number,
            },
            accessToken,
          },
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
  static async addStaff(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { first_name, last_name, email, phone_number } = req.body;
      let staff = await StaffService.findOneStaff({
        email: email.trim().toLowerCase(),
      });
      if (staff)
        return handleResponse(
          req,
          res,
          { status: "error", message: "Staff already exists" },
          400
        );
      const password = await random(5);
      const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.BCRYPT_SALT)
      );

      staff = await StaffService.createStaff({
        first_name: first_name,
        last_name: last_name,
        email: email.trim().toLowerCase(),
        phone_number: phone_number.trim(),
        password: hashedPassword,
      });

      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Staff added successfully",
          data: {
            first_name: staff.first_name,
            last_name: staff.last_name,
            id: staff.id,
            email: staff.email,
            phone_number: staff.phone_number,
            password,
          },
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

export default StaffController;
