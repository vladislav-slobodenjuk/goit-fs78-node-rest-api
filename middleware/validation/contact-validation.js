import contactSchema from "../../schemas/contacts-schemas.js";
import validateBody from "../../decorators/validateBody.js";

const addContactValidate = validateBody(contactSchema);

export default addContactValidate;
