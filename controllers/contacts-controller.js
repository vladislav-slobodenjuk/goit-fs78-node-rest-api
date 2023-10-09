import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { Contact } from "../models/Contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  let result = null;

  if (favorite) {
    result = await Contact.find({ owner, favorite }, "-updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");
  } else {
    result = await Contact.find({ owner }, "-updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");
  }

  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) throw HttpError(404, `id ${contactId} not found`);

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const r = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );
  if (!r) throw HttpError(404, `id ${contactId} not found`);

  res.json(r);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) throw HttpError(404, `id=${contactId} not found`);

  res.json({ message: `contact id=${contactId} deleted` });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
