import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: { type: String, required: true },
    phone: { type: String, required: [true, "Please provide your number"] },
    role: {
      type: String,
      enum: {
        values: ["User", "Admin"],
      },
      required: [true, "Please provide your number"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
