import { Router } from "express";
import { verifyStaff, verifySuperStaff } from "../../middlewares";
import StaffController from "./controller";
import AuthValidator from "./validator";

const router = Router();

router.post("/login", AuthValidator.loginValidation, StaffController.login);

router.post(
  "/create",
  verifyStaff,
  verifySuperStaff,
  AuthValidator.addStaffValidation,
  StaffController.addStaff
);

export default router;
