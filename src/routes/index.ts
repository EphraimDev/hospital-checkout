import express from "express";
import { StaffRoutes, ReservationRoutes } from "../modules";

const app = express();

app.use("/staff", StaffRoutes);
app.use("/reservations", ReservationRoutes);

export default app;
