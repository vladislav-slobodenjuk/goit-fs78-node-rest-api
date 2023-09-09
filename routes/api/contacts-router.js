import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import addContactValidate from "../../middlewares/validation/contact-validation.js";

const router = express.Router();

router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getById);

router.post("/", addContactValidate, contactsController.add);
// router.post("/", contactsController.add);

// router.put("/:contactId", addContactValidate, contactsController.updateById);

// router.delete("/:contactId", contactsController.deleteById);

// router.patch("/:contactId/favorite", contactsController.patchById);

export default router;
