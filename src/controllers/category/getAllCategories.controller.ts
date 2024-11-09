import { Request, Response } from 'express'
import categoryService from '../../services/category/index.services'
import { customError } from '../../helpers/error.helper'

const getAllCategories = async (_req: Request, res:Response) => {
    try {
        const categories = await categoryService.getAllCategories()

        res.status(200).json({categories})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
        res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default getAllCategories