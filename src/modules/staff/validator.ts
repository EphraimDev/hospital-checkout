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
      email: Joi.string().required(),
      password: Joi.string().required(),
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
