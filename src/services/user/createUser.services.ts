import errorHelper from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcrypt'
import userDto from '../../dto/user/registerUserDTO'

const createUser = async (user: userDto) => {
  try {
    // Validar modelo de usuario
    await validateHelper(userModel, user)

    // verificar si el usuario ya existe
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
    await userModel.create({
      name: user.name,
      surname: user.surname,
      password: hashPassword,
      email: user.email,
      dob: user.dob,
      role: user.role
    })
  } catch (error) {
    throw errorHelper.internalServerError(
      'Error al crear el usuario',
      'CREATE_USER_ERROR'
    )
  }
}

export default createUser
