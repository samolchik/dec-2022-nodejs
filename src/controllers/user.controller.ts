import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userMapper } from "../mappers";
import { userService } from "../services";
import { IUser } from "../types";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = await userService.findById(userId);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await userService.updateById(userId, req.body);

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      await userService.deleteById(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(userId, avatar);

      const response = userMapper.toResponse(user);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      const user = await userService.deleteAvatar(userId);

      const response = userMapper.toResponse(user);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
