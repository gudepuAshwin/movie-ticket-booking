import express from "express";
import { book } from "./seats.controller.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";

const seatRouter = express.Router();

seatRouter.put("/:id", authenticate, book);

export default seatRouter;
