import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { PurchaseService } from "./purchase.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getPurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await PurchaseService.getPurchaseHistory(req.params.userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchase history retrieved successfully!",
    data: result,
  });
});

export const PurchaseController = {
  getPurchaseHistory,
};
