import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customError.js";

vine.errorReporter = () => new CustomErrorReporter();

//Admin schema for validation while registering
export const adminRegisterSchema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32),
});

//Admin schema for validation while login
export const adminLoginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
