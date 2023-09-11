import validateBody from "../decorators/validateBody.js";
import { contactPatchSchema } from "../models/Contact.js";

const validateContactPatch = validateBody(contactPatchSchema);

export default validateContactPatch;
