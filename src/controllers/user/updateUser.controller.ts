import { Request, Response } from "express";
import userService from '../../services/user/index.services'
import { customError } from "../../helpers/error.helper";

const updateUser = async (req: Request, res: Response) => {
    try {
        console.log('obteiendo datos...');
        const id = req.params.id

        const updatedData = req.body
        console.log('Data = ', updatedData);

        console.log('Llamando al servicio...');
        const user = await userService.updateUser(String(id), updatedData)

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