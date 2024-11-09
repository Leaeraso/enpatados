import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const getProducts = async (_req: Request, res: Response) => {
  try {
    console.log('pidiendo productos a la base de datos')
    const products = await productService.getProducts()

    res.status(200).json({ products })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default getProducts
