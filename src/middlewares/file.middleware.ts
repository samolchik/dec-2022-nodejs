import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs";
import { ApiError } from "../errors";
// import { isObjectIdOrHexString } from "mongoose";
//
// import { ApiError } from "../errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("Avatar must be only one", 400);
      }

      const { size, mimetype } = req.files.avatar;

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError("Avatar has invalid format", 400);
      }

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError("Avatar is big", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
