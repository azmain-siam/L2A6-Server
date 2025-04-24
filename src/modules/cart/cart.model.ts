import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const CartSchema = new Schema<ICart>({
  user: { type: Schema.ObjectId, ref: "User", required: true, unique: true },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  ],
});

const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
