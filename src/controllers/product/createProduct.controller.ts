import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    }

    await productService.createProduct(product)

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
