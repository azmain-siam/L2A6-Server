import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live⚡");
});

export default app;
