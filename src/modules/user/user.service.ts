import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";
import jwt from "jsonwebtoken";

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const updateUserInfo = async (payload: Partial<IUser>, userId: string) => {
  const { phone } = payload;

  if (phone) {
    const existingUser = await User.findOne({ phone, _id: { $ne: userId } });
    if (existingUser) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Phone number already in use!"
      );
    }
  }

  const user = await User.findByIdAndUpdate(userId, payload, { new: true });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
  };

  const accessToken = jwt.sign(jwtPayload, "secret", {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtPayload, "secret", {
    expiresIn: "365d",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...remaining } = user.toObject();

  return { accessToken, refreshToken, user: remaining };
};

export const UserService = {
  createUser,
  updateUserInfo,
};
