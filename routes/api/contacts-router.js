import express from "express";

import authentificate from "../../middlewares/authentificate.js";

import validateContactId from "../../middlewares/validateContactId.js";
import validateContactAdd from "../../middlewares/validateContactAdd.js";
import validateContactPatch from "../../middlewares/validateContactPatch.js";

import contactsController from "../../controllers/contacts-controller.js";

const router = express.Router();

router.get("/", authentificate, contactsController.getAll);

router.get(
  "/:contactId",
  authentificate,
  validateContactId,
  contactsController.getById
);

router.post("/", authentificate, validateContactAdd, contactsController.add);

router.put(
  "/:contactId",
  authentificate,
  validateContactId,
  validateContactAdd,
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  validateContactId,
  validateContactPatch,
  contactsController.updateById
);

router.delete(
  "/:contactId",
  authentificate,
  validateContactId,
  contactsController.deleteById
);

export default router;
