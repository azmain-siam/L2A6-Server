import { Types } from "mongoose";

export interface IListing {
  _id?: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  images?: string[];
  userId: Types.ObjectId;
  status: "available" | "sold";
}
