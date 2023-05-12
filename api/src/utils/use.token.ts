import * as jwt from 'jsonwebtoken'
import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";

export const useToken = (token: string): IUseToken | string => {
  try {
    
    const decode = jwt.decode(token) as AuthTokenResult
    
    const currentDate = new Date()
    const expiresDate = new Date(decode.exp)
    const isExpired = +expiresDate <= +currentDate / 1000
    
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired
    }
  } catch (err) {
    return 'Token is invalid'
  }
}