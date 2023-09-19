import validateBody from "../decorators/validateBody.js";
import { userUpdateSchema } from "../models/User.js";

const validateUserUpdate = validateBody(userUpdateSchema);

export default validateUserUpdate;
