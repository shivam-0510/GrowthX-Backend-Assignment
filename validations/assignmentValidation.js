import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customError.js";

vine.errorReporter = () => new CustomErrorReporter();

//Assignment schema for validation
export const assignmentSchema = vine.object({
  task: vine.string(),
  admin: vine.string(),
});
