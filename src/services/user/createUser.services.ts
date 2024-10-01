import errorHelper from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcrypt'
import userDto from '../../dto/user/userDTO'
import { Model } from 'sequelize'
import UserResponse from '../../dto/user/userResponseDTO'

const createUser = async (user: userDto): Promise<UserResponse> => {
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
    const newUser: Model = await userModel.create({
      name: user.name,
      surname: user.surname,
      password: hashPassword,
      email: user.email,
      dob: user.dob
    })

    const response: UserResponse = {
      name: newUser.get('name') as string,
      surname: newUser.get('surname') as string,
      email: newUser.get('email') as string,
      dob: newUser.get('dob') as Date
    }

    return response
  } catch (error: any) {
    throw errorHelper.internalServerError(error.message, 'CREATE_USER_ERROR')
  }
}

export default createUser
