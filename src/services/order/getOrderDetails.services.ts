import orderDetailsDTO from '../../dto/order/orderDetailsDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderProductModel from '../../models/order/orderProduct.models'

const getOrderDetails = async (id: number) => {
  try {
    const details = await orderProductModel.findAll({
      where: {
        orderId: id
      }
    })

    if (details.length === 0) {
      throw errorHelper.notFoundError(
        'No se encontraron los productos',
        'BAD_RESQUEST_ERROR'
      )
    }

    const orderDetails: orderDetailsDTO[] = details.map((detail) => {
      return detail.toJSON() as orderDetailsDTO
    })

    return orderDetails
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al obtener los productos',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getOrderDetails
