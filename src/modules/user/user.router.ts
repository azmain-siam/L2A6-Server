import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/", UserController.createUser);
userRouter.put("/:userId", UserController.updateUserInfo);

export default userRouter;
