import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import config from "../config";

interface IDecodedUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Extend Express Request type
declare module "express-serve-static-core" {
  interface Request {
    user?: IDecodedUser;
  }
}

const auth = (requiredRoles: string[] = []) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (
      !authHeader
      // || !authHeader.startsWith("Bearer ")
    ) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: No token provided"
      );
    }

    const token = authHeader;

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret!
      ) as IDecodedUser;

      // Role check
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "Forbidden: Access denied");
      }

      req.user = decoded;
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: Invalid or expired token"
      );
    }
  });

export default auth;
