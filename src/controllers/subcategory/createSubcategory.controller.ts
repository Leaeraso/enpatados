import { Request, Response } from 'express'
import categoryService from '../../services/category/index.services'
import { customError } from '../../helpers/error.helper'

const createSubcategory = async (req: Request, res:Response) => {
    try {
        const category = {
            title: req.body.title,
            description: req.body.description,
            icon: req.body.icon
        }

        await categoryService.createCategory(category)

        res.status(201).json({mesage: 'Categoria creada con exito'})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default createSubcategory