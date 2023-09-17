import bcrypt from "bcrypt";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { User } from "../models/User.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, `email ${email} is in use`);

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPass });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  //
};

export default {
  register: ctrlWrapper(register),
};
