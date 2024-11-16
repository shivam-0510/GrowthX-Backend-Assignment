import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customError.js";

vine.errorReporter = () => new CustomErrorReporter();

//User schema for validation while registering
export const userRegisterSchema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32),
});

//User schema for validation while login
export const userLoginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
