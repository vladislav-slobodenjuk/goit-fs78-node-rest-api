import validateBody from "../decorators/validateBody.js";
import { userLoginSchema } from "../models/User.js";

const validateUserLogin = validateBody(userLoginSchema);

export default validateUserLogin;
