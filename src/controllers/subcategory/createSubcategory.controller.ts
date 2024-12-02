import { Request, Response } from 'express'
import subcategoryService from '../../services/subcategory/index.services'
import { customError } from '../../helpers/error.helper'

const createSubcategory = async (req: Request, res:Response) => {
    try {
        const subcategory = {
            name: req.body.name,
            categoryId: req.body.categoryId
        }

        await subcategoryService.createSubcategory(subcategory)

        res.status(201).json({message: 'Categoria creada con exito'})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default createSubcategory