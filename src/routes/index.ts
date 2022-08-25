import express from "express";
import { StaffRoutes } from "../modules";

const app = express();

app.use("/staff", StaffRoutes);

export default app;
