import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.addProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Product added successfully",
    data: result,
  });
});

export const ProductController = {
  addProduct,
};
