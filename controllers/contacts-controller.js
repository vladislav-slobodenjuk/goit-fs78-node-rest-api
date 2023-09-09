import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.getContactById(contactId);
//   if (!result) throw HttpError(404, `id=${contactId} not found`);

//   res.json(result);
// };

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const updateById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.updateContactById(contactId, req.body);
//   if (!result) throw HttpError(404, `id=${contactId} not found`);

//   res.json(result);
// };

// const deleteById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.deleteContactById(contactId);
//   if (!result) throw HttpError(404, `id=${contactId} not found`);

//   res.json({ message: `contact id=${contactId} deleted` });
// };

// const patchById = async (req, res) => {

//   res.json({ message: `contact id=${contactId} deleted` });
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
