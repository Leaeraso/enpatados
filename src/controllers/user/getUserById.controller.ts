import { Request, Response } from 'express'
import userService from '../../services/user/index.services'
import { customError } from '../../helpers/error.helper'

const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const userRole = req.user.role

        const user = await userService.getUserById(Number(id), userId, userRole)

        res.status(200).json({user})
    } catch (error: any | customError) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res
              .status(500)
              .json({ message: 'internal server error', error: error.message })
        }
    }
}

export default getUserById