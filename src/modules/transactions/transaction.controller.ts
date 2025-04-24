import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TransactionService } from "./transaction.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  // console.log(req, "requset");
  const result = await TransactionService.createTransaction(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Transaction created successfully",
    data: result,
  });
});

export const TransactionController = {
  createTransaction,
};
