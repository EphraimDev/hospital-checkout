import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

const config = {
  dialect: DB_DIALECT as Dialect,
  username: DB_USER as string,
  password: DB_PASSWORD,
  database: DB_NAME as string,
  host: DB_HOST as string,
};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default sequelize;
