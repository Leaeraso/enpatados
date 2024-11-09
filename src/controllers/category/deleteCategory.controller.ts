import { Request, Response } from 'express'
import categoryService from '../../services/category/index.services'
import { customError } from '../../helpers/error.helper'

const deleteCategory = async (req: Request, res:Response) => {
    try {
        const id = req.params.id

        await categoryService.deleteCategory(Number(id))

        res.status(200).json({message: 'Categoria eliminada exitosamente'})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export default deleteCategory