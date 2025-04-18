import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ListingService } from "./listing.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import Listing from "./listing.model";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/fileUpload";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  // console.log(req.body);
  if (req.file) {
    const path = req.file.path;
    const { secure_url } = (await sendImageToCloudinary(path, "listing")) as {
      secure_url: string;
    };
    body.images = [secure_url];
  }

  const result = await ListingService.addProduct(body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Product added successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("Product id =>", productId);

  const product = await Listing.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  const result = await ListingService.updateProduct(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteSpecificProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Listing.findById(id);

    if (!product) {
      throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    const result = await ListingService.deleteSpecificProduct(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.NO_CONTENT,
      message: "Product deleted successfully",
      data: result,
    });
  }
);

export const ListingController = {
  addProduct,
  updateProduct,
  deleteSpecificProduct,
};
