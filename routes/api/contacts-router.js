import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import validateContactId from "../../middlewares/validateContactId.js";
import validateContactAdd from "../../middlewares/validateContactAdd.js";
import validateContactPatch from "../../middlewares/validateContactPatch.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", validateContactId, contactsController.getById);

router.post("/", validateContactAdd, contactsController.add);

router.put(
  "/:contactId",
  validateContactId,
  validateContactAdd,
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  validateContactId,
  validateContactPatch,
  contactsController.updateById
);

router.delete("/:contactId", validateContactId, contactsController.deleteById);

export default router;
