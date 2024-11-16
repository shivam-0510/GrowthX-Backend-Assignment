import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/Authenticate.js";
const adminRouter = express.Router();

adminRouter
  .post("/register", adminController.registerNewAdmin)
  .post("/login", adminController.loginAdmin)
  .get("/assignments", authMiddleware, adminController.getAllAssignments)
  .post(
    "/assignments/:id/accept",
    authMiddleware,
    adminController.acceptAssignment
  )
  .post(
    "/assignments/:id/reject",
    authMiddleware,
    adminController.rejectAssignment
  );

export default adminRouter;
