import { model, Schema } from "mongoose";
import { IListing } from "./listing.interface";

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: [true, "Product title is required"] },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: { type: Number, required: [true, "Product price is required"] },
    condition: { type: String },
    category: { type: String },
    images: { type: Array },
    userId: { type: Schema.ObjectId, required: true, ref: "User" },
    status: {
      type: String,
      enum: ["available", "sold"],
      required: true,
      default: "available",
    },
  }
  // {
  //   timestamps: true,
  // }
);

const Listing = model("Listing", listingSchema);

export default Listing;
