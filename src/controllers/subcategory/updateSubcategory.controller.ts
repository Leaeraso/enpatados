import { Request, Response } from 'express'
import subcategoryService from '../../services/subcategory/index.services'
import { customError } from '../../helpers/error.helper'

const updateSubcategory = async (req: Request, res:Response) => {
    try {
        const id = req.params.id

        const updatedData = req.body

        const subcategory = await subcategoryService.updateSubcategory(Number(id), updatedData)

        res.status(200).json({subcategory})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default updateSubcategory