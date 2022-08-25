import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import handleResponse from "../../middlewares/handleResponse";

class ReservationValidator {
  static async createValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().optional(),
      phone_number: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      room_type: Joi.string().required(),
      room_number: Joi.number().required(),
      checkout_time: Joi.date().required(),
      amount_paid: Joi.number().required(),
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

export default ReservationValidator;
