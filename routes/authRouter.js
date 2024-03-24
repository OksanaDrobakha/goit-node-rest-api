import express from "express";
import authController from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  authController.signin
);

export default authRouter;
