import { Router } from "express";
import {
  validateRoomType,
  verifyRoomAvailability,
  verifyStaff,
} from "../../middlewares";
import ReservationController from "./controller";
import ReservationValidator from "./validator";

const router = Router();

router.post(
  "/",
  verifyStaff,
  ReservationValidator.createValidation,
  verifyRoomAvailability,
  validateRoomType,
  ReservationController.reserveRoom
);

router.get(
  "/",
  verifyStaff,
  ReservationValidator.allValidation,
  ReservationController.viewReservations
);

router.get(
  "/:id",
  verifyStaff,
  ReservationValidator.singleValidation,
  ReservationController.viewReservation
);

export default router;
