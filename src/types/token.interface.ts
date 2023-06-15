import { IUser } from "./user.interface";

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, "email" | "password">;
export type ITokenPayload = Pick<IUser, "name" | "_id">;
