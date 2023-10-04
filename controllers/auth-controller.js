import path from "path";
import fs from "fs/promises";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import { HttpError, trimAvatar, sendEmail } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { User } from "../models/User.js";

const { JWT_SECRET, BASE_URL } = process.env;

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

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: `Test email verification for ${email}`,
    html: `<strong>Click <a target='_blank' href='${BASE_URL}/api/users/verify/${newUser.verificationToken}'>link</a> to verify email</strong>`,
  };

  await sendEmail(verifyEmail);

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

  if (!user.verify) throw HttpError(401, `Email is not verified`);

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

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, `User not found`);

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, `Email not found`);

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: `Test email verification for ${email}`,
    html: `<strong>Click <a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>link</a> to verify email</strong>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateCurrent: ctrlWrapper(updateCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
};
