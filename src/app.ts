import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.interface";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.json()) - Цей код дозволяє Express.js розпізнавати та обробляти дані,що надходять у форматі JSON.
// Він встановлює middleware, який аналізує тіло запиту та перетворює його з JSON у JavaScript об'єкт.
// Це дозволяє вам зручно отримувати доступ до даних, які надсилаються у форматі JSON у вашому серверному додатку.
//
// app.use(express.urlencoded({ extended: true })) - Цей код встановлює middleware для обробки даних, що надходять
// у форматі URL-кодування (application/x-www-form-urlencoded). Він аналізує дані з запиту, які передаються у формі
// POST або запиті GET з параметрами URL, та розшифровує їх у JavaScript об'єкт. Параметр extended: true дозволяє
// використовувати більш складні структури даних, такі як масиви або об'єкти, у URL-кодованому форматі.
//
// CRUD - create, read, update, delete

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
