import express from "express";
import contactsService from "../../models/contacts-model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "get by id template message" });
});

router.post("/", async (req, res, next) => {
  res.json({
    message: "post template message",
    contact: req.body,
  });
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
