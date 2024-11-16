import vine, { errors } from "@vinejs/vine";
import adminModel from "../models/adminModel.js";
import {
  adminRegisterSchema,
  adminLoginSchema,
} from "../validations/adminValidation.js";
import {
  generateHashPassword,
  comparePasswords,
  generateToken,
} from "../utils/helper.js";
import assignmentModel from "../models/assignmentModel.js";

class adminController {
  static registerNewAdmin = async (req, res) => {
    try {
      const body = req.body;

      // Validate input
      const validator = vine.compile(adminRegisterSchema);
      const payload = await validator.validate(body);

      // Check if the admin already exists
      const findAdmin = await adminModel.findOne({ email: payload.email });
      if (findAdmin) {
        return res.status(409).json({ message: "Admin already exists" });
      }

      // Hash the admin's password
      const hashedPassword = await generateHashPassword(payload.password);

      // Create and save the admin
      const newAdmin = new adminModel({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      });

      await newAdmin.save();

      //generate new token
      const token = generateToken(newAdmin);

      //return the response
      return res.status(201).json({
        message: "Admin registered successfully",
        user: newAdmin,
        access_token: `Bearer ${token}`,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "Something went wrong while registering the admin.",
        });
      }
    }
  };

  static loginAdmin = async (req, res) => {
    try {
      const body = req.body;

      // Validate input
      const validator = vine.compile(adminLoginSchema);
      const payload = await validator.validate(body);

      // Check if the admin exists
      const admin = await adminModel.findOne({ email: payload.email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Validate the password
      const isPasswordValid = await comparePasswords(
        payload.password,
        admin.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate and return a token
      const token = generateToken(admin);

      //return the response
      return res.status(200).json({
        message: "Login successful",
        access_token: `Bearer ${token}`,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "Something went wrong during login.",
        });
      }
    }
  };

  static getAllAssignments = async (req, res) => {
    try {
      const { id } = req.user;

      //populate the assignment object
      const allAssignments = await assignmentModel
        .find({ admin: id })
        .populate("admin", "username")
        .populate("userId", "username")
        .select("userId task admin");

      const response = allAssignments.map((assignment) => ({
        userId: assignment.userId.username,
        task: assignment.task,
        admin: assignment.admin ? assignment.admin.username : null,
      }));

      return res.status(200).json({ assignments:response });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while fetching assignments.",
      });
    }
  };

  static acceptAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      const { id: adminId } = req.user; 

      // Find the assignment
      const findAssignment = await assignmentModel.findById(id);
      if (!findAssignment) {
        return res.status(400).json({ message: "Assignment doesn't exist" });
      }

      // Check if the assignment belongs to the logged-in admin
      if (findAssignment.admin.toString() !== adminId.toString()) {
        return res
          .status(403)
          .json({
            message: "You do not have permission to modify this assignment",
          });
      }

      // Update the assignment status to "accepted"
      findAssignment.status = "accepted";
      await findAssignment.save();
      return res.status(200).json({
        message: "Assignment accepted",
        remarks: remarks || "No remarks provided",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while accepting the assignment.",
      });
    }
  };

  static rejectAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      const { id: adminId } = req.user; 

      // Find the assignment
      const findAssignment = await assignmentModel.findById(id);
      if (!findAssignment) {
        return res.status(400).json({ message: "Assignment doesn't exist" });
      }

      // Check if the assignment belongs to the logged-in admin
      if (findAssignment.admin.toString() !== adminId.toString()) {
        return res
          .status(403)
          .json({
            message: "You do not have permission to modify this assignment",
          });
      }

      // Update the assignment status to "rejected"
      findAssignment.status = "rejected";
      await findAssignment.save();
      return res.status(200).json({
        message: "Assignment rejected",
        remarks: remarks || "No remarks provided",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while rejecting the assignment.",
      });
    }
  };
}

export default adminController;
