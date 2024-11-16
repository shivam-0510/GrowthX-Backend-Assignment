import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customError.js";

vine.errorReporter = () => new CustomErrorReporter();

export const userRegisterSchema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32),
});

export const userLoginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
