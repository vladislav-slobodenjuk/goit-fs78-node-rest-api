import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.add);

router.put("/:contactId", contactsController.updateById);

router.delete("/:contactId", contactsController.deleteById);

export default router;
