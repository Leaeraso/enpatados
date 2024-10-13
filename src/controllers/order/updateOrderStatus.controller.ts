import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import orderService from '../../services/order/index.services'

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id

    const newState = req.body

    const order = await orderService.updateOrderStatus(
      Number(orderId),
      newState
    )

    res.status(200).json({ order })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default updateOrderStatus
