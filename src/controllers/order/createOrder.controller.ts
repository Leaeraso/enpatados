import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import orderService from '../../services/order/index.services'

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id

    const products = req.body

    await orderService.createOrder(Number(userId), products)
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'Error al registrar el producto' })
    }
  }
}

export default createOrder