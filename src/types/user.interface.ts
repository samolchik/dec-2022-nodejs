import { Document } from "mongoose";

export interface IUser extends Document {
  // _id?: Types.ObjectId;
  name?: string;
  age?: number;
  gender?: string;
  email: string;
  password: string;
}
