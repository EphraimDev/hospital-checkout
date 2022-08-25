import { Router } from "express";
import { validateRoomType, verifyRoomAvailability, verifyStaff } from "../../middlewares";
import ReservationController from "./controller";
import ReservationValidator from "./validator";

const router = Router();

router.post(
  "/create",
  verifyStaff,
  ReservationValidator.createValidation,
  verifyRoomAvailability,
  validateRoomType,
  ReservationController.reserveRoom
);

export default router;
