import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcryptjs'
import userDto from '../../dto/user/registerUserDTO'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { SECRET_KEY } = process.env

const createUser = async (user: userDto) => {
  try {
    await validateHelper(userModel, user)

    const existingUser = await userModel.findOne({
      where: {
        email: user.email
      }
    })

    if (existingUser !== null) {
      throw errorHelper.badRequestError(
        'El usuario ya existe',
        'USER_ALREADY_EXISTS'
      )
    }

    const hashPassword = await bcrypt.hash(user.password, 10)

    const newUser = await userModel.create({
      name: user.name,
      surname: user.surname,
      password: hashPassword,
      email: user.email,
      dob: user.dob
    })

    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY no está definida en las variables de entorno')
    }

    const tokenInfo = {
      id: newUser.id,
      role: newUser.role,
      email: newUser.email
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
      'Error al registrar el usuario',
      'LOGIN_USER_ERROR'
    )
  }
}

export default createUser
