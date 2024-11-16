import express from "express";
import connectDB from "./config/dbConfig.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
const server = express();
import dotenv from "dotenv";
dotenv.config();

//MongoDB connection
connectDB();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//User routes
server.use("/api/v1/user", userRouter);

//Admin routes
server.use("/api/v1/admin", adminRouter);

server.get("/", (req, res) => {
  res.send("Homepage");
});

server.listen(process.env.PORT, () => {
  console.log("SERVER STARTED");
});
