import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customError.js";

vine.errorReporter = () => new CustomErrorReporter();

export const assignmentSchema = vine.object({
  task: vine.string(),
  admin: vine.string(),
});
