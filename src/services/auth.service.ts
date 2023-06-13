import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ICredentials, ITokensPair, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokensPair> {
    try {
      // user = await User.findOne({ email: credentials.email });

      user = await this.getOneByEmailOrThrow(credentials.email);

      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        _id: user._id,
      });

      await Token.create({
        ...tokensPair,
        _userId: user._id,
      });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async getOneByEmailOrThrow(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("User not found", 422);
    }

    return user;
  }
}

export const authService = new AuthService();
