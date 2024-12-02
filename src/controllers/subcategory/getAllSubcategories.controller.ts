import { Request, Response } from 'express'
import subcategoryService from '../../services/subcategory/index.services'
import { customError } from '../../helpers/error.helper'

const getAllSubcategories = async (_req: Request, res:Response) => {
    try {
        const subcategories = await subcategoryService.getAllSubcategories()

        res.status(200).json({subcategories})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
        res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default getAllSubcategories