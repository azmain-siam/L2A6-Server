import { Request, Response } from "express";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body;

  const result = await UserService.createUser(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserService.updateUserInfo(req.body, userId);

  const { accessToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: { accessToken },
  });
});

export const UserController = {
  createUser,
  updateUserInfo,
};
