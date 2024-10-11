import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    await productService.deleteProduct(Number(id))

    res.status(200).json({ message: 'Producto eliminado con exito' })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'Error al registrar el producto' })
    }
  }
}

export default deleteProduct
