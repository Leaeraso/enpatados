import {Request, Response} from 'express'
import orderService from '../../services/order/index.services'
import { customError } from '../../helpers/error.helper'

const updateOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const updatedOrder = req.body

        const order = await orderService.updateOrder(id, updatedOrder)

        res.status(200).json({order})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default updateOrder