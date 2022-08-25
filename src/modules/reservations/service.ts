import { Customer, Reservation, Staff } from "../../database/models";
import { ReservationInput } from "../../database/models/Reservation";

class ReservationService {
  static async findOneReservation(query: ReservationInput) {
    const reservation = await Reservation.findOne({
      where: query,
      include: [
        {
          model: Staff,
          as: "checkInStaff",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Staff,
          as: "checkOutStaff",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    return reservation;
  }

  static async findAllReservations(
    reservationQuery: ReservationInput,
  ) {
    const reservation = await Reservation.findAll({
      where: reservationQuery,
      include: [
        {
          model: Staff,
          as: "checkInStaff",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Staff,
          as: "checkOutStaff",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    return reservation;
  }

  static async createReservation(payload: ReservationInput) {
    const reservation = await Reservation.create(payload);
    return reservation;
  }

  static async updateReservation(
    reservation: Reservation,
    payload: ReservationInput
  ) {
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const val = payload[key];
        reservation[key] = val;
      }
    }
    await reservation.save();
    return reservation;
  }
}

export default ReservationService;
