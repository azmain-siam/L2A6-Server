import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: IUser = req.body;

    const result = await UserService.createUser(payload);

    sendResponse(res, {
      status: true,
      message: "User created successfully",
      data: result,
    })
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
