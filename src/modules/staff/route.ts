import { Router } from "express";
import verifyStaff from "../../middlewares/verifyStaff";
import verifySuperStaff from "../../middlewares/verifySuperStaff";
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
