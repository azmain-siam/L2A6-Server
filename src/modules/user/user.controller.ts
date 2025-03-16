import { Request, Response } from "express";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body;

  const result = await UserService.createUser(payload);

  sendResponse(res, {
    status: true,
    message: "User created successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
};
