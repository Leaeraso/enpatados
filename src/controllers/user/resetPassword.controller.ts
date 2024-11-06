import { Request, Response } from "express"
import userService from '../../services/user/index.services'
import { customError } from "../../helpers/error.helper"

const updateUser = async (req: Request, res: Response) => {
    try {
        const { token } = req.params
        const { newPassword } = req.body

        await userService.resetPassword(token, newPassword)

        res.status(200).json({message: 'Contraseña actualizada exitosamente'})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default updateUser