import { Router } from "express";
import StaffController from "./controller";
import AuthValidator from "./validator";

const router = Router();

router.post(
  "/login",
  AuthValidator.loginValidation,
  StaffController.login
);

export default router;
