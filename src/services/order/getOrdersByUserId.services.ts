import orderDTO from '../../dto/order/orderDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'

const getOrdersByUserId = async (id: number) => {
  try {
    const orders = await orderModel.findAll({
      where: {
        userId: id
      }
    })

    if(orders.length === 0) {
      throw errorHelper.notFoundError(
        'Ordenes no encontradas',
        'NOT_FOUND_ERROR'
      )
    }

    const ordersReturn: orderDTO[] = orders.map((order) => {
      return order.toJSON() as orderDTO
    })

    return ordersReturn
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al obtener la orden de compra',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getOrdersByUserId
