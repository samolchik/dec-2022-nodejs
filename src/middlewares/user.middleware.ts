import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";

class UserMiddleware {
  public isEmailValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const email = req.params[field];

        if (!email) {
          throw new ApiError("Email not valid", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
