import { Types } from "mongoose";
import { IListing } from "../listings/listing.interface";

interface transaction {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  itemID: Types.ObjectId;
}

export interface ITransaction {
  transaction: transaction[];
  status: "pending" | "completed";
}

export interface IPayment {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  items: IListing[];
}
