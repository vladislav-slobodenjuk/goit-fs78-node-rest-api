import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { User } from "../models/User.js";

const { JWT_SECRET } = process.env;

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
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "-createdAt -updatedAt");

  if (!user) throw HttpError(401, `Email or password is wrong`);

  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) throw HttpError(401, `Email or password is wrong`);

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30min" });

  await User.findOneAndUpdate({ email }, { token });

  res.json({
    user: { user: user.email, subscription: user.subscription },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
