import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/user/user.router";
import authRouter from "./modules/auth/auth.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import listingRouter from "./modules/listings/listing.router";
import transactionRouter from "./modules/transactions/transaction.router";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/transactions", transactionRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live⚡");
});

app.use(globalErrorHandler);

export default app;
