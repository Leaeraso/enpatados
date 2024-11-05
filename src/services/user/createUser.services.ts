import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcrypt'
import userDto from '../../dto/user/registerUserDTO'
import emailHelper from '../../helpers/emailHelper'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { SECRET_KEY } = process.env

const createUser = async (user: userDto) => {
  try {
    // Validar modelo de usuario
    console.log('validando el modelo')
    await validateHelper(userModel, user)

    // verificar si el usuario ya existe
    console.log('buscando usuario existente')
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

    // encriptar la contraseña
    const hashPassword = await bcrypt.hash(user.password, 10)

    //Crear al nuevo usuario
    console.log('creando al usuario')
    await userModel.create({
      name: user.name,
      surname: user.surname,
      password: hashPassword,
      email: user.email,
      dob: user.dob
    })

    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY no está definida en las variables de entorno')
    }

    const verificationToken = jwt.sign(
      {email: user.email},
      SECRET_KEY,
      {expiresIn: '5m'}
    )

    console.log('enviando confirmacio de registro')

    await emailHelper.sendConfirmationEmail(user.email, user.name, verificationToken)

    return 
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
