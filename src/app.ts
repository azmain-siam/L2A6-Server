import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/user/user.router";
import authRouter from "./modules/auth/auth.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import listingRouter from "./modules/listings/listing.router";
import transactionRouter from "./modules/transactions/transaction.router";
import purchaseRouter from "./modules/purchase/purchase.router";
import salesRouter from "./modules/sales/sales.router";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/sales", salesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live⚡");
});

app.use(globalErrorHandler);

export default app;
