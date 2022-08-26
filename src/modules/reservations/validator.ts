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

  static async allValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      status: Joi.string().optional(),
      checking_time: Joi.date().optional(),
      room_type: Joi.string().optional(),
      room_number: Joi.number().optional(),
      checkout_time: Joi.date().optional(),
    });

    const { error } = schema.validate(req.query);
    if (error)
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        422
      );
    return next();
  }

  static async singleValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate(req.params);
    if (error)
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        422
      );
    return next();
  }

  static async payValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      overstay_fee: Joi.number().required(),
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
