import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./common/config/db.js";
import userRouter from "./modules/user/user.rout.js";
import seatRouter from "./modules/seats/seats.rout.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new express();
app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/booking", seatRouter);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/seats", async (req, res) => {
  try {
    const result = await pool.query("select * from seats");
    res.status(200).json({
      message: "Seats fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch seats",
    });
  }
});

export default app;
