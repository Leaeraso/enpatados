import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const product = await productService.getProductById(id)

    res.status(200).json({ product })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default getProduct
