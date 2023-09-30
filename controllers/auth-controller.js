import path from "path";
import fs from "fs/promises";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import HttpError from "../helpers/HttpError.js";
import trimAvatar from "../helpers/trimAvatar.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { User } from "../models/User.js";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // const { path: tempPath, filename } = req.file;
  const tempPath = req.file?.path;
  const filename = req.file?.filename;

  if (user) {
    if (tempPath) await fs.unlink(tempPath);
    throw HttpError(409, `email ${email} is in use`);
  }

  let avatarURL = "";

  if (!req.file) {
    avatarURL = gravatar.url(email, { protocol: "http", s: 250 });
  } else {
    const newPath = path.join(avatarPath, filename);
    await fs.rename(tempPath, newPath);
    avatarURL = path.join("avatars", filename);
    trimAvatar(newPath);
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashedPass,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
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

const updateCurrent = async (req, res) => {
  const { email } = req.user;
  const { subscription } = req.body;

  await User.findOneAndUpdate({ email }, { subscription });

  res.json({ message: `user '${email}' is now '${subscription}'` });
};

const updateAvatar = async (req, res) => {
  const { email } = req.user;

  if (!req.file) throw HttpError(400, `image file required`);

  const { path: tempPath, filename } = req.file;

  const newPath = path.join(avatarPath, filename);
  await fs.rename(tempPath, newPath);
  const avatarURL = path.join("avatars", filename);
  trimAvatar(newPath);

  await User.findOneAndUpdate({ email }, { avatarURL });

  res.json({ user: { email, avatarURL } });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateCurrent: ctrlWrapper(updateCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
