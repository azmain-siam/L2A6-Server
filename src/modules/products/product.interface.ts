import { Types } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  condition: string;
  images?: string[];
  userId: Types.ObjectId;
  status: "available" | "sold";
}
