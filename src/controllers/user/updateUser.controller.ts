import { Request, Response } from "express";
import userService from '../../services/user/index.services'
import { customError } from "../../helpers/error.helper";

const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const role = req.user.role

        const updatedData = req.body

        const user = await userService.updateUser(String(id), updatedData, role)

        res.status(200).json({user})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default updateUser