import { Response } from "express";

export interface TokenPayload {
  user_id: number;
  email: string;
}

type MyLocals = {
  authUser: TokenPayload;
};

export type AuthResponse = Response<any, MyLocals>;
