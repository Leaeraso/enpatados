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
    console.log('llamando al servicio')

    await userService.createUser(user)

    res.status(201).json({
      message: 'Usuario registrado con exito'
    })
  } catch (error) {
    if (error instanceof customError) {
      console.error('Custom Error:', error)
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      console.error('Internal Server Error:', error)
      res.status(500).json({ message: 'Error al registrar el usuario' })
    }
  }
}

export default registerUser
