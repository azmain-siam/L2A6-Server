import { Types } from "mongoose";

export interface ITransaction {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  itemID: Types.ObjectId;
  status: "pending" | "completed";
}
