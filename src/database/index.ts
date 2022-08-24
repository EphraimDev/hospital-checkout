import logger from "../utils/logger";
import sequelize from "./config";

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    logger(module).error(`⚡️[Database]: Database successfully connected`);
  } catch (error) {
    console.log(error);
  }
};
export default initializeDB;
