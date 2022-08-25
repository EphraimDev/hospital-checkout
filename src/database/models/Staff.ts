import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface StaffAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  last_login?: Date;
  is_active?: boolean;
  access_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface StaffInput extends Optional<StaffAttributes, "id" | "email"> {}
export interface StaffOuput extends Required<StaffAttributes> {}
class Staff
  extends Model<StaffAttributes, StaffInput>
  implements StaffAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public phone_number!: string;
  public last_login!: Date;
  public is_active!: boolean;
  public access_token!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Staff.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    freezeTableName: true,
  }
);

export default Staff;
