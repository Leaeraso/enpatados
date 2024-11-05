import { Request, Response } from "express"
import { customError } from "../../helpers/error.helper"
import userService from '../../services/user/index.services'

const validateRegistration = async (req: Request, res: Response) => {
    try {
        const {token} = req.query

        if (typeof token !== 'string') {
            throw new Error('Token invalido')
        }

        await userService.confirmUser(token)


        res.status(200).json({
            message: 'Usuario validado con exito'
        })
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'Error al verificar el registro del usuario' })
        }
    }
}

export default validateRegistration