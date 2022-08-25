import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import cors from "cors";
import rTracer from "cls-rtracer";
import { handleGracefulShutdown } from "./src/internals";
import logger from "./src/utils/logger";
import initializeDB from "./src/database";
import appRoutes from "./src/routes";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "development")
  app.use("/logs", express.static(path.join(__dirname, "../logs")));

app.use(rTracer.expressMiddleware());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hospital Checkout Server");
});

app.use("/api/v1", appRoutes)

app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("This route does not exist");
});

server.listen(port, () => {
  logger(module).error(`⚡️[server]: Server is running at port ${port}`);
  initializeDB();
});

const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
sigs.forEach((sig) => {
  process.on(sig, () => handleGracefulShutdown(server));
});
