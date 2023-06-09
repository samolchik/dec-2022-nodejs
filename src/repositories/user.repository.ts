import { User } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }
}

export const userRepository = new UserRepository();
