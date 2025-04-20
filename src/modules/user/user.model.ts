import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: { type: String, required: true, select: false },
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

userSchema.pre("save", async function (next) {
  const password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );

  this.password = password;
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = model<IUser>("User", userSchema);

export default User;
