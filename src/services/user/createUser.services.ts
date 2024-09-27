import errorHelper from '../../helpers/errorHelper'
import validateHelper from '../../helpers/validateHelper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcrypt'
import userDto from '../../dto/user/registerUser.dto'
import { Model } from 'sequelize'

const createUser = async (user: userDto): Promise<Model | undefined> => {
  try {
    // Validar modelo de usuario
    await validateHelper(userModel, user)

    // verificar si el usuario ya existe
    const existingUser = await userModel.findAll({
      where: {
        email: user.email
      }
    })

    if (existingUser) {
      errorHelper.badRequestError('El usuario ya existe')
      return
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

    return newUser
  } catch (error) {
    errorHelper.internalServerError('Error al crear el usuario')
    return
  }
}

export default createUser
