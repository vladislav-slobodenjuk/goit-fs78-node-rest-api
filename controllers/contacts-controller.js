import Joi from "joi";

import contactsService from "../models/contacts-model.js";
import HttpError from "../helpers/HttpError.js";

const ContactSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "name" }),
  email: Joi.string().required().messages({ "any.required": "email" }),
  phone: Joi.string().required().messages({ "any.required": "phone" }),
});


const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) throw HttpError(404, `id=${contactId} not found`);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = ContactSchema.validate(req.body);
    if (error)
      throw HttpError(400, `missing required field '${error.message}'`);

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = ContactSchema.validate(req.body);
    if (error)
      throw HttpError(400, `missing required field '${error.message}'`);

    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) throw HttpError(404, `id=${contactId} not found`);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.deleteContactById(contactId);
    if (!result) throw HttpError(404, `id=${contactId} not found`);

    res.json({ message: `contact id=${contactId} deleted` });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
