/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/user/user.router";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live⚡");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // console.log(err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message, error: err });
});

export default app;
