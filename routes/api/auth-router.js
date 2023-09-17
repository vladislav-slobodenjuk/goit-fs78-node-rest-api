import express from "express";

import authController from "../../controllers/auth-controller.js";
import validateUserRegister from "../../middlewares/validateUserRegister.js";
import validateUserLogin from "../../middlewares/validateUserLogin.js";
import authentificate from "../../middlewares/authentificate.js";

const authRouter = express.Router();

authRouter.post("/register", validateUserRegister, authController.register);

authRouter.post("/login", validateUserLogin, authController.login);

authRouter.get("/current", authentificate, authController.getCurrent);

export default authRouter;
