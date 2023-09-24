import validateBody from "../decorators/validateBody.js";
import { userRegisterSchema } from "../models/User.js";

const validateUserRegister = validateBody(userRegisterSchema);

export default validateUserRegister;
