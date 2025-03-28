import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/user/user.router";
import authRouter from "./modules/auth/auth.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import productRouter from "./modules/products/product.router";

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
app.use("/api/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live⚡");
});

app.use(globalErrorHandler);

export default app;
