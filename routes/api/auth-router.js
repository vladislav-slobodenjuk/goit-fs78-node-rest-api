import express from "express";

import authController from "../../controllers/auth-controller.js";

import validateUserRegister from "../../middlewares/validateUserRegister.js";
import validateUserLogin from "../../middlewares/validateUserLogin.js";
import validateUserUpdate from "../../middlewares/validateUserUpdate.js";

import authentificate from "../../middlewares/authentificate.js";

const authRouter = express.Router();

authRouter.post("/register", validateUserRegister, authController.register);

authRouter.post("/login", validateUserLogin, authController.login);

authRouter.post("/logout", authentificate, authController.logout);

authRouter.get("/current", authentificate, authController.getCurrent);

authRouter.patch(
  "/current",
  authentificate,
  validateUserUpdate,
  authController.updateCurrent
);

export default authRouter;
