import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ListingService } from "./listing.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import Listing from "./listing.model";
import AppError from "../../errors/AppError";
// import { sendImageToCloudinary } from "../../utils/fileUpload";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.images || !Array.isArray(body.images) || body.images.length < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Images are required");
  }

  const result = await ListingService.addProduct(body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Product added successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};
  if (search) {
    query.title = { $regex: search, $options: "i" }; // case-insensitive search by product name
  }
  const result = await ListingService.getAllProducts(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getAllProductsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await ListingService.getAllProductsByUserId(userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Products retrieved successfully",
      data: result,
    });
  }
);

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ListingService.getSingleProduct(productId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = JSON.parse(req.body.data); // assuming body contains images field

  const product = await Listing.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  // If images not sent in body, keep existing images
  if (!body.images || !Array.isArray(body.images) || body.images.length < 1) {
    body.images = product.images;
  }

  const result = await ListingService.updateProduct(id, body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const updateProductStatus = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ListingService.updateProductStatus(productId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Product marked as sold!",
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
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteSpecificProduct,
  getAllProductsByUserId,
  updateProductStatus,
};
