import { model, Schema } from "mongoose";
import Joi from "joi";

import { handleSaveError, runUpdateValidation } from "./hooks.js";

const roleList = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: roleList,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

// contactSchema.pre("findOneAndUpdate", runUpdateValidation);
// contactSchema.post("findOneAndUpdate", handleSaveError);

export const User = model("user", userSchema);

export const userRegisterSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "email", "any.pattern": "wrong email format" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "password" }),
  subscription: Joi.string()
    .valid(...roleList)
    .default("starter"),
});

export const userLogInSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "email" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "password" }),
});
