import express from "express";

import authController from "../../controllers/auth-controller.js";
import validateUserRegister from "../../middlewares/validateUserRegister.js";

const authRouter = express.Router();

authRouter.post("/register", validateUserRegister, authController.register);

export default authRouter;
