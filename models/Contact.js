import { model, Schema } from "mongoose";
import Joi from "joi";

import { handleSaveError, runUpdateValidation } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runUpdateValidation);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const Contact = model("contact", contactSchema);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "name" }),
  email: Joi.string().required().messages({ "any.required": "email" }),
  phone: Joi.string().required().messages({ "any.required": "phone" }),
  favorite: Joi.boolean(),
});

export const contactPatchSchema = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "favorite" }),
});
