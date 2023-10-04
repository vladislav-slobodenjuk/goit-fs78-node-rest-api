import validateBody from "../decorators/validateBody.js";
import { userEmailSchema } from "../models/User.js";

const validateUserEmail = validateBody(userEmailSchema);

export default validateUserEmail;
