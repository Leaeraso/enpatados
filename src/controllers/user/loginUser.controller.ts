import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import userService from '../../services/user/index.services'

const loginUser = async (req: Request, res: Response) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Email and password are required' })
    }

    const token: string | undefined = await userService.loginUser(user)

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true
    })

    res.status(200).json({ token })
  } catch (error: any | customError) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res
        .status(500)
        .json({ message: 'internal server error' })
    }
  }
}

export default loginUser
