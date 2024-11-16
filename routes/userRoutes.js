import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/Authenticate.js";
const userRouter = express.Router();

userRouter
  .post("/register", userController.registerNewUser)
  .post("/login", userController.loginUser)
  .get("/admins", authMiddleware, userController.getAllAdmins)
  .post("/upload", authMiddleware, userController.uploadAssignment);

export default userRouter;
