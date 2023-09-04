import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "name" }),
  email: Joi.string().required().messages({ "any.required": "email" }),
  phone: Joi.string().required().messages({ "any.required": "phone" }),
});

export default contactSchema;
