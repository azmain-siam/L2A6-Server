import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password doesn't match");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
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

export const AuthService = {
  register,
  login,
};
