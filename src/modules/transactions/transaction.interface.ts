import { Types } from "mongoose";
import { IListing } from "../listings/listing.interface";

interface transaction {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  itemID: Types.ObjectId;
}

export interface ITransaction {
  transactionInfo: transaction[];
  status: "pending" | "completed";
  sessionId: string;
}

export interface IPayment {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  items: IListing[];
}
