import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import orderService from '../../services/order/index.services'

const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id

    const details = await orderService.getOrderDetails(Number(orderId))

    res.status(200).json({ details })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default getOrderDetails
