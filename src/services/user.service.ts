import { ApiError } from "../errors";
import { User } from "../models";
import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(id);
  }

  public async updateById(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser> {
    await this.getOneByIdOrThrow(userId);

    return await User.findOneAndUpdate(
      { _id: userId },
      { ...data },
      {
        returnDocument: "after", //спочатку update, потім виводиться юзер
      }
    );
  }

  public async deleteById(userId: string): Promise<void> {
    await this.getOneByIdOrThrow(userId);

    await User.deleteOne({ _id: userId });
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 422);
    }

    return user;
  }
}

export const userService = new UserService();
