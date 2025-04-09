import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { SalesService } from "./sales.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getSalesHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await SalesService.getSalesHistory(req.params.userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Sales history retrieved successfully!",
    data: result,
  });
});

export const SalesController = {
  getSalesHistory,
};
