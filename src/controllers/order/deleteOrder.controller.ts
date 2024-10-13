import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import orderService from '../../services/order/index.services'

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id

    await orderService.deleteOrder(Number(orderId))

    res.status(200).json({ message: 'Orden eliminada con exito' })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default deleteOrder
