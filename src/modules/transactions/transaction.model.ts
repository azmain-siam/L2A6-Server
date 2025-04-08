import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    senderId: { type: Schema.ObjectId, required: true },
    receiverId: { type: Schema.ObjectId, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
