import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { User } from "../models/User.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, `email ${email} is in use`);

  const newUser = await User.create(req.body);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export default {
  register: ctrlWrapper(register),
};
