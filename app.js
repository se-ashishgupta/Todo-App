import express from "express";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

//craeting server
export const app = express();

config({
  path: "./data/config.env",
});
//Using Middleware
app.use(express.json()); //Used before routes mendetory
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Using Error Middleware
app.use(errorMiddleware);
