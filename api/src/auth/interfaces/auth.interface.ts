import * as jwt from 'jsonwebtoken';
import { ROLES } from 'src/constants/roles';

export interface ISingJWT{
  payload: jwt.JwtPayload;
  secret: string;
  expires: string | number;
}

export interface PayloadToken{
  role: ROLES;
  sub: string
}

export interface AuthBody{
  username: string;
  password: string
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}