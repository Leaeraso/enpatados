import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const updatedData = req.body

    const product = await productService.updateProduct(Number(id), updatedData)

    res.status(200).json({ product })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default updateProduct
