import { Types } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  items: string[];
}

export interface IAddCart {
  user: Types.ObjectId;
  productId: string;
}
