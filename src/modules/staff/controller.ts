import { Response } from "express";
import bcrypt from "bcrypt";
import StaffService from "./service";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import AccessToken from "../../utils/accessToken";
import handleResponse from "../../middlewares/handleResponse";

class StaffController {
  static async login(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { email, password } = req.body;
      let staff = await StaffService.findOneStaff({
        email,
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

      const isPasswordCorrect = bcrypt.compareSync(password, staff.password);
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
          message: "User signed in successfully",
          data: {
            user: {
              firstName: staff.first_name,
              lastName: staff.last_name,
              id: staff.id,
              email: staff.email,
              phoneNumber: staff.phone_number,
            },
            accessToken,
          },
        },
        200
      );
    } catch (error: any) {
      console.log(error);
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
