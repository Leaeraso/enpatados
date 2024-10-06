import { Request, Response, NextFunction } from 'express'
import errorHelper from '../helpers/error.helper'
import jwt from 'jsonwebtoken'

const authPermissions = (permissions: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userRole = req.body.role

      if (permissions.includes(userRole)) {
        return next()
      } else {
        return next(
          errorHelper.notAuthorizedError(
            'No tienes permisos para hacer esto',
            'NOT_AUTHORIZED'
          )
        )
      }
    } catch (error) {
      return next(
        errorHelper.notAuthorizedError(
          'No tienes permisos para hacer esto',
          'NOT_AUTHORIZED'
        )
      )
    }
  }
}

const authToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token

    if (!token) {
      errorHelper.notAuthorizedError('Token requerido', 'INVALID_CREDENTIALS')
    }

    const user = jwt.verify(token, process.env.SECRET_KEY as string)
    req.user = user
    next()
  } catch (error) {}
}

export { authPermissions, authToken }
