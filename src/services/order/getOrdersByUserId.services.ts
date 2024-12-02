import orderDTO from '../../dto/order/orderDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'

const getOrdersByUserId = async (id: number, page: number, pageSize: number) => {
  try {
    const options = {
      limit: pageSize,
      offset: (page - 1) * pageSize
    }

    const {count, rows} = await orderModel.findAndCountAll({
      ...options,
      where: {
        userId: id
      }
    })

    if(rows.length === 0) {
      throw errorHelper.notFoundError(
        'Ordenes no encontradas',
        'NOT_FOUND_ERROR'
      )
    }

    const orders: orderDTO[] = rows.map((row) => {
      return row.toJSON() as orderDTO
    })

    const totalPages = Math.ceil(count / pageSize)

    return {orders, totalPages, count}
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
