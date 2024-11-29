import { Request, Response } from 'express'
import categoryService from '../../services/category/index.services'
import { customError } from '../../helpers/error.helper'

const getAllCategories = async (req: Request, res:Response) => {
    try {
        const {page = 1, pageSize = 10} = req.params

        const {categories, totalPages, count} = await categoryService.getAllCategories(Number(page), Number(pageSize))

        res.status(200).json({
            data: categories,
            pagination: {
                currentPage: +page,
                totalPages,
                totalRecords: count,
                pageSize: +page
            }
        })
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
        res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default getAllCategories