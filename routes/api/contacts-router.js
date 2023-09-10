import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import validateContactId from "../../middlewares/validateContactId.js";
import validateContactAdd from "../../middlewares/validateContactAdd.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", validateContactId, contactsController.getById);

router.post("/", validateContactAdd, contactsController.add);

// router.put("/:contactId", validateContactId, validateContactAdd, contactsController.updateById);

// router.delete("/:contactId",validateContactId,  contactsController.deleteById);

// router.patch("/:contactId/favorite",validateContactId, contactsController.patchById);

export default router;
