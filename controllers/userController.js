import vine, { errors } from "@vinejs/vine";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import assignmentModel from "../models/assignmentModel.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../validations/userValidation.js";
import { assignmentSchema } from "../validations/assignmentValidation.js";
import {
  generateHashPassword,
  comparePasswords,
  generateToken,
} from "../utils/helper.js";

class userController {
  static registerNewUser = async (req, res) => {
    try {
      const body = req.body;

      // Validate input
      const validator = vine.compile(userRegisterSchema);
      const payload = await validator.validate(body);

      // Check if the user already exists
      const findUser = await userModel.findOne({ email: payload.email });
      if (findUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash the user's password
      const hashedPassword = await generateHashPassword(payload.password);

      // Create and save the user
      const newUser = new userModel({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      });

      await newUser.save();

      //create new token
      const token = generateToken(newUser);

      //return the response
      return res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        access_token: `Bearer ${token}`,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "Something went wrong while registering the user.",
        });
      }
    }
  };

  static loginUser = async (req, res) => {
    try {
      const body = req.body;

      // Validate input
      const validator = vine.compile(userLoginSchema);
      const payload = await validator.validate(body);

      // Check if the user exists
      const user = await userModel.findOne({ email: payload.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate the password
      const isPasswordValid = await comparePasswords(
        payload.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate and return a token
      const token = generateToken(user);

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

  static uploadAssignment = async (req, res) => {
    try {
      const body = req.body;

      // Validate input
      const validator = vine.compile(assignmentSchema);
      const payload = await validator.validate(body);

      //create new assignment
      const newAssignment = new assignmentModel({
        userId: req.user.id,
        task: payload.task,
        admin: payload.admin,
      });

      await newAssignment.save();

      //add assignment to the user data
      const findUser = await userModel.findById({ _id: req.user.id });
      findUser.assignmentsSubmitted.push(newAssignment._id);
      await findUser.save();

      //populating the assignment object
      const populatedAssignment = await assignmentModel
        .findById(newAssignment._id)
        .populate("admin", "username")
        .populate("userId", "username")
        .select("userId task admin");

      const response = {
        userId: populatedAssignment.userId.username,
        task: populatedAssignment.task,
        admin: populatedAssignment.admin
          ? populatedAssignment.admin.username
          : null,
      };

      //return the response
      return res.status(201).json({
        message: "Assignment submitted successfully",
        response,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while uploading the assignment.",
      });
    }
  };

  static getAllAdmins = async (req, res) => {
    try {
      //find all admins
      const allAdmins = await adminModel.find({}).select("id username");
      return res.status(200).json({ admins: allAdmins });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while fetching admins.",
      });
    }
  };
}

export default userController;
