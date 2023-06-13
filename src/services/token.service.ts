import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ITokensPair } from "../types";

class TokenService {
  public generateTokenPair(
    payload: Record<string, string | number>
  ): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
