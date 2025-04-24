/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Transaction from "./transaction.model";
import stripeCheckout from "../../utils/stripe-pay";
import { IListing } from "../listings/listing.interface";
import Listing from "../listings/listing.model";

const createTransaction = async (payload: any) => {
  const { items, buyerId, amounts } = payload;

  // Check availability & build Stripe line items
  const lineItems = await Promise.all(
    items.map(async (item: IListing) => {
      if (item.status === "sold") {
        throw new AppError(StatusCodes.BAD_REQUEST, "Item(s) not available");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.images,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      };
    })
  );

  // Add platform fee
  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Platform Fee (3%)",
      },
      unit_amount: Math.round(amounts.taxAmount * 100),
    },
    quantity: 1,
  });

  // Mark items as sold and collect transaction records
  const transactionItems = await Promise.all(
    items.map(async (item: IListing) => {
      // await Listing.findByIdAndUpdate(item._id, { status: "sold" });

      return {
        buyerID: buyerId,
        sellerID: item.userId._id,
        itemID: item._id,
      };
    })
  );

  // Save transaction record
  const transaction = await Transaction.create({
    transactionInfo: transactionItems,
    status: "pending",
  });

  // Create Stripe session
  const sessionId = await stripeCheckout(lineItems, transaction._id.toString());

  return {
    data: transaction,
    sessionId,
  };
};

const completeTransaction = async (transactionId: string) => {
  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    {
      status: "completed",
    },
    { new: true }
  );

  transaction?.transactionInfo.forEach(async (transaction) => {
    await Listing.findByIdAndUpdate(
      transaction.itemID,
      { status: "sold" },
      { new: true }
    );
  });

  return transaction;
};

export const TransactionService = {
  createTransaction,
  completeTransaction,
};
