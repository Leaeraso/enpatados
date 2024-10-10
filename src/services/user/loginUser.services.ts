import loginUserDTO from '../../dto/user/loginUserDTO'
import userModel from '../../models/user/userModel.models'
import errorHelper, { customError } from '../../helpers/error.helper'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { SECRET_KEY } = process.env

const loginUser = async (user: loginUserDTO): Promise<string | undefined> => {
  try {
    const userRecord = await userModel.findOne({
      where: { email: user.email }
    })

    if (userRecord === null) {
      throw errorHelper.notFoundError('Usuario no encontrado', 'USER_NOT_FOUND')
    }

    // Lo mapeamos a un DTO ya que findOne devuelve o un Model o un any
    const loginUser: loginUserDTO = userRecord.toJSON() as loginUserDTO

    const validation = await bcrypt.compare(user.password, loginUser.password)

    if (!validation) {
      throw errorHelper.notAuthorizedError(
        'Usuario no autorizado',
        'INVALID_CREDENTIALS'
      )
    }

    // Verificamos que la clave secreta exista
    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY no está definida en las variables de entorno')
    }

    // informacion que se incluira en el payload  del token JWT
    const tokenInfo = {
      id: loginUser.id,
      role: loginUser.role
    }

    const token = jwt.sign(tokenInfo, SECRET_KEY, {
      expiresIn: process.env.EXPIRE_TOKEN
    })

    return token
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al logear al usuario',
      'LOGIN_USER_ERROR'
    )
  }
}

export default loginUser
