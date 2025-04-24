/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Listing from "../listings/listing.model";
import Transaction from "./transaction.model";
import stripeCheckout from "../../utils/stripe-pay";
import { IListing } from "../listings/listing.interface";

const createTransaction = async (payload: any) => {
  const { items, buyerId, amounts } = payload;

  // 1. Check availability & build Stripe line items
  const lineItems = await Promise.all(
    items.map(async (item: IListing) => {
      console.log(item.status);
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

  // 2. Add platform fee
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

  // 3. Create Stripe session
  const sessionId = await stripeCheckout(lineItems);

  // 4. Mark items as sold and collect transaction records
  const transactionItems = await Promise.all(
    items.map(async (item: IListing) => {
      if (sessionId) {
        await Listing.findByIdAndUpdate(item._id, { status: "sold" });
      }

      return {
        buyerID: buyerId,
        sellerID: item.userId._id,
        itemID: item._id,
      };
    })
  );

  // 5. Save transaction record
  const transaction = await Transaction.create({
    transaction: transactionItems,
    status: sessionId ? "completed" : "pending",
  });

  // 6. Return final result
  return {
    data: transaction,
    sessionId,
  };
};

export const TransactionService = {
  createTransaction,
};
