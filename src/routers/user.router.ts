import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
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

export const userRouter = router;
