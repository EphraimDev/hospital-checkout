import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Staff from "./Staff";

interface ReservationAttributes {
  reservation_id: number;
  room_type: string;
  customer_id: string;
  amount_paid?: string;
  checking_time?: Date;
  checkout_time?: Date;
  staff_checked_in?: number;
  staff_checked_out?: number;
  time_checked_out?: Date;
  total_amount?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface ReservationInput
  extends Optional<ReservationAttributes, "reservation_id"> {}
export interface ReservationOuput extends Required<ReservationAttributes> {}
class Reservation
  extends Model<ReservationAttributes, ReservationInput>
  implements ReservationAttributes
{
  public reservation_id!: number;
  public room_type!: string;
  public customer_id!: string;
  public amount_paid!: string;
  public checking_time!: Date;
  public checkout_time!: Date;
  public staff_checked_in!: number;
  public staff_checked_out?: number;
  public time_checked_out?: Date;
  public total_amount?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Reservation.init(
  {
    reservation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checking_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_checked_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staff_checked_out: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_checked_out: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

Reservation.belongsTo(Staff, {
  as: "checkInStaff",
  targetKey: "id",
  foreignKey: "staff_checked_in",
});

Reservation.belongsTo(Staff, {
  as: "checkOutStaff",
  targetKey: "id",
  foreignKey: "staff_checked_out",
});

Reservation.belongsTo(Staff, {
  as: "customer",
  targetKey: "id",
  foreignKey: "customer_id",
});

export default Reservation;
