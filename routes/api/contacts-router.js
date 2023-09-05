import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import addContactValidate from "../../middleware/validation/contact-validation.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", addContactValidate, contactsController.add);

router.put("/:contactId", addContactValidate, contactsController.updateById);

router.delete("/:contactId", contactsController.deleteById);

export default router;
