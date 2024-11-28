import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const createProduct = async (req: Request, res: Response) => {
  try {
    const {name, description, price, stock, categoryId} = req.body
    const images: string[] = req.body.images

    const product = {
      name,
      description,
      price,
      stock,
      categoryId
    }

    await productService.createProduct(product, images)

    res.status(201).json({ message: 'Producto registrado con exito' })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'Error al registrar el producto' })
    }
  }
}

export default createProduct
