import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Listing from "../listings/listing.model";
import { ITransaction } from "./transaction.interface";
import Transaction from "./transaction.model";

const createTransaction = async (payload: ITransaction) => {
  const { itemID } = payload;

  const item = await Listing.findById(itemID);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, "Item not found");
  }

  if (item.status === "sold") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Item not available");
  }

  const result = await Transaction.create(payload);

  return result;
};

export const TransactionService = {
  createTransaction,
};
