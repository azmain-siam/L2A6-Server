import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import User from "../user/user.model";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  let user;

  if (req.body.email) {
    user = await User.findOne({ email: req.body.email });
  }

  if (req.body.phone) {
    user = await User.findOne({ phone: req.body.phone });
  }

  if (user) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Email or Phone already registered",
    });
  }

  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Login successful",
    data: accessToken,
  });
});

export const AuthController = {
  register,
  login,
};
