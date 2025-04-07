import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import Product from "./product.model";
import AppError from "../../error/AppError";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.addProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Product added successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  // console.log("Product id =>", productId);

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  const result = await ProductService.updateProduct(productId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteSpecificProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    const result = await ProductService.deleteSpecificProduct(productId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.NO_CONTENT,
      message: "Product deleted successfully",
      data: result,
    });
  }
);

export const ProductController = {
  addProduct,
  updateProduct,
  deleteSpecificProduct,
};
