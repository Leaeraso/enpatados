import { Request, Response } from 'express'
import categoryService from '../../services/category/index.services'
import { customError } from '../../helpers/error.helper'

const getCategoryById = async (req: Request, res:Response) => {
    try {
        const id = req.params.id

        const category = await categoryService.getCategoryById(id)

        res.status(200).json({ category })
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default getCategoryById