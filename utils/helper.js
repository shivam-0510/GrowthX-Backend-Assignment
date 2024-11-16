import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = { id: user._id, email: user.email };
  const secret = process.env.JWT_SECRET; // Use a secure secret from environment variables
  const options = { expiresIn: "1h" }; // Token expiration time

  return jwt.sign(payload, secret, options);
};

export const generateHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
