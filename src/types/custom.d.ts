import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

declare global {
  declare namespace Express {
    export interface Request {
      user: any
    }
    export interface Response {
      user: any
    }
  }
}

export interface IGetUserAuthInfoRequest extends Request {
  user: string | JwtPayload
}
