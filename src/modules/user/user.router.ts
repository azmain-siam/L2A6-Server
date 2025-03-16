import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/", UserController.createUser);

export default userRouter;
