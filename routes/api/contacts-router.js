import express from "express";
import contactsService from "../../models/contacts-model.js";
import Joi from "joi";

import HttpError from "../../helpers/HttpError.js";

const router = express.Router();

const ContactSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "name" }),
  email: Joi.string().required().messages({ "any.required": "email" }),
  phone: Joi.string().required().messages({ "any.required": "phone" }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) throw HttpError(404, `id=${contactId} not found`);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = ContactSchema.validate(req.body);
    if (error)
      throw HttpError(400, `missing required field '${error.message}'`);

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({
    message: "delete template message",
    id: req.params.contactId,
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({
    message: "put template message",
    id: req.params.contactId,
    contact: req.body,
  });
});

export default router;
