import { Request, Response } from 'express'
import userService from '../../services/user/index.services'
import { customError } from '../../helpers/error.helper'

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email,
      dob: req.body.dob
    }

    const createdUser = await userService.createUser(user)

    res.status(201).json({
      message: 'Usuario registrado con exito',
      createdUser
    })
  } catch (error) {
    console.error('error al registrar el usuario: ', error)

    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default registerUser
