require("dotenv").config();

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

module.exports = {
  dialect: DB_DIALECT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
};
