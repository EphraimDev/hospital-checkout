import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import handleResponse from "../../middlewares/handleResponse";

class StaffValidator {
  static async loginValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        422
      );
    return next();
  }

  static async addStaffValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      phone_number: Joi.string().trim().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        422
      );
    return next();
  }
}

export default StaffValidator;
