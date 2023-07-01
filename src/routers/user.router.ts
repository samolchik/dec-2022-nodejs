import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.findAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.findById
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  userController.updateById
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.deleteById
);

router.post(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar
);

router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteAvatar
);

export const userRouter = router;
