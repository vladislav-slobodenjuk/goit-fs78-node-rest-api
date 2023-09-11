import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const validateContactId = (req, res, next) => {
  const { contactId } = req.params;
  if (isValidObjectId(contactId)) return next();
  return next(HttpError(404, `${contactId} is not valid id`));
};

export default validateContactId;
