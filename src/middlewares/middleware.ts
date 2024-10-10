import { Request, Response, NextFunction } from 'express'
import errorHelper from '../helpers/error.helper'
import jwt from 'jsonwebtoken'

const authPermissions = (permissions: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userRole = req.body.role

      if (permissions.includes(userRole)) {
        next()
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
    // Ahora lo envio a traves del header, luego debo utilizarlo en las cookies
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw errorHelper.notAuthorizedError(
        'Token requerido',
        'INVALID_CREDENTIALS'
      )
    }

    const user = jwt.verify(token, process.env.SECRET_KEY as string)
    req.user = user
    next()
  } catch (error) {
    return next(
      errorHelper.notAuthorizedError(
        'Token invalido o expirado',
        'INVALID_CREDENTIALS'
      )
    )
  }
}

export { authPermissions, authToken }
