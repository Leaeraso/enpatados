import orderModel from '../../models/order/order.models'
import productModel from '../../models/product/product.models'
import userModel from '../../models/user/userModel.models'
import orderDTO from '../../dto/order/orderDTO'
import { Op } from 'sequelize'
import errorHelper, { customError } from '../../helpers/error.helper'

const getOrdersOfWeek = async (today: Date) => {
    try {
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        weekStart.setHours(0, 0, 0, 0)
        console.log('calculando inicio de semana', weekStart)

        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)
        console.log('calculando fin de semana', weekEnd)

        const orders = await orderModel.findAll(
            {
                where: {
                    date: { [Op.between]: [weekStart, weekEnd]}
                },
                include: [
                    {
                        model: productModel,
                        attributes: ['name', 'price']
                    },
                    {
                        model: userModel,
                        attributes: ['name', 'surname']
                    }
                ]
            }
        )

        if(orders.length === 0) {
            errorHelper.notFoundError('No se encontraron ordenes en esta semana', 'NOT_FOUND_ERROR')
        }

        const ordersJSON: orderDTO[] = orders.map((order) => {
            return order.toJSON() as orderDTO
        })

        console.log('Ordenes de compra de la semana', ordersJSON)

        return ordersJSON
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
          
        console.error(error);
        throw errorHelper.internalServerError(
            'Error al obtener las ordenes de la semana',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getOrdersOfWeek