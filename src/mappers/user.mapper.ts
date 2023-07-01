import { configs } from "../configs";
import { IUser } from "../types";

class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      age: user.age,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
    };
  }
}

export const userMapper = new UserMapper();
