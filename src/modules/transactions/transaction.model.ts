import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>({
  transactionInfo: [
    {
      buyerID: { type: Schema.ObjectId, ref: "User", required: true },
      sellerID: { type: Schema.ObjectId, ref: "User", required: true },
      itemID: { type: Schema.ObjectId, ref: "Listing", required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  sessionId: { type: String },
});

const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
