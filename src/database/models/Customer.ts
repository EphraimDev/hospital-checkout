import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface CustomerAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface CustomerInput extends Optional<CustomerAttributes, "id"> {}
export interface CustomerOuput extends Required<CustomerAttributes> {}
class Customer
  extends Model<CustomerAttributes, CustomerInput>
  implements CustomerAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Customer.init(
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Customer;
