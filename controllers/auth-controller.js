import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { User } from "../models/User.js";

const register = async (req, res) => {
  console.log("register");

  console.log(req.body);

  // const result = { result: req.body };
  const result = User.create(req.body);

  res.json(result);
};

export default {
  register: ctrlWrapper(register),
};
