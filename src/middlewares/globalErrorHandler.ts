/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import e, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

interface IErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  error: any;
  name?: string;
  stack?: string;
}

export const globalErrorHandler = (
  err: IErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.CastError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message, error: err });
  } else if (err instanceof Error) {
    res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message, error: err });
  } else if (err.name === "ValidationError") {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
      error: err,
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
      error: err,
    });
  }
};
