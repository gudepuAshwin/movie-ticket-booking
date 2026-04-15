import express from "express";
import { register, login } from "./user.controller.js";
import { registerDto, loginDto } from "../../common/dto/validate.dto.js";
import validate from "../../common/middleware/dto.middleware.js";

const userRouter = express.Router();

userRouter.post("/user", validate(registerDto), register);
userRouter.post("/user/login", validate(loginDto), login);

export default userRouter;
