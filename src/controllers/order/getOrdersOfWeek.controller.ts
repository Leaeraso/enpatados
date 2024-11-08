import { Request, Response } from 'express'
import orderService from '../../services/order/index.services'
import { customError } from '../../helpers/error.helper'
const getOrdersOfWeek = async (_req: Request, res: Response) => {
    try {
        const today = new Date()
        
        console.log('llamando al servicio')
        const orders = await orderService.getOrdersOfWeek(today)

        res.status(200).json({orders})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
          } else {
            res.status(500).json({ message: 'internal server error' })
          }
    }
}

export default getOrdersOfWeek