import { Response } from "express";

interface ISuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | T[] | null;
}

const sendResponse = <T>(res: Response, data: ISuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    status: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
