import { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
}
