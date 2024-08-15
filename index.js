import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

import rootRouter from "./routes/root.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";

import { logger, logEvents } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/connectDB.js";
import mongoose from "mongoose";

dotenv.config();

connectDB();
const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

const PORT = process.env.PORT || 3500;

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Page Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("Connected to MongoDB");
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
