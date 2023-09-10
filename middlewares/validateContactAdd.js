import validateBody from "../decorators/validateBody.js";
import { contactAddSchema } from "../models/Contact.js";

const validateContactAdd = validateBody(contactAddSchema);

export default validateContactAdd;
