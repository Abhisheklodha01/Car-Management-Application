import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import { config } from "dotenv";
import userRouter from "./routes/user.route.js";
import carRouter from "./routes/car.route.js";
import bodyParser from "body-parser";

config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

app.use("/api/users", userRouter);
app.use("/api/cars", carRouter);

export default app;
