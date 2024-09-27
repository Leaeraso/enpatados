import { Request, Response } from 'express'
import userService from '../../services/user/index.services'
import errorHelper from '../../helpers/errorHelper'

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email,
      dob: req.body.dob
    }

    await userService.createUser(user)

    res.status(201).json({
      message: 'Usuario registrado con exito'
    })
  } catch (error) {
    errorHelper.internalServerError('error al registrar el usuario')
  }
}

export default registerUser
