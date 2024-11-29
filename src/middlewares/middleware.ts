import { Request, Response, NextFunction } from 'express'
import errorHelper from '../helpers/error.helper'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

const authPermissions = (permissions: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role

      console.log('rol del usuario: ', userRole)

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
    //const token = req.signedCookies.token
    let token = req.headers['authorization']?.split(' ')[1]

    if(!token){
      token = typeof req.query.token === 'string' ? req.query.token : undefined
    }

    console.log('obteniendo token:', token)

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
    if (error instanceof TokenExpiredError) {
      return next(
        errorHelper.notAuthorizedError(
          'Token expirado, por favor inicie sesión nuevamente',
          'TOKEN_EXPIRED'
        )
      )
    }
    return next(
      errorHelper.notAuthorizedError(
        'Token invalido',
        'INVALID_CREDENTIALS'
      )
    )
  }
}

export { authPermissions, authToken }
