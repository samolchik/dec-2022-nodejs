import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenTypes } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { ICredentials, IUser } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register
);

router.post(
  "/activate/:token",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  authMiddleware.checkActionToken(EActionTokenTypes.Active),
  authController.activateAccount
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);

router.post(
  "/change/password",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/forgot/password",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.isUserExist<IUser>("email"),
  authController.forgotPassword
);

router.put(
  "/forgot/password/:token",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  authMiddleware.checkActionToken(EActionTokenTypes.Forgot),
  authController.setForgotPassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
