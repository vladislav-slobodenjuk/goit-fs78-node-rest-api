import { model, Schema } from "mongoose";
import Joi from "joi";

const roleList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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

//
// post/pre hooks go here
//

export const User = model("user", userSchema);

export const userAddSchema = Joi.object({
  email: Joi.string().required().messages({ "any.required": "name" }),
  password: Joi.string().required().messages({ "any.required": "password" }),
  subscription: Joi.string()
    .valid(...roleList)
    .default("starter"),
});
