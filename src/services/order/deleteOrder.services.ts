import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'

const deleteOrder = async (id: number) => {
  try {
    const deletedOrder = await orderModel.destroy({
      where: {
        orderNumber: id
      }
    })

    if (deletedOrder === 0) {
      throw errorHelper.badRequestError(
        'Orden no encontrada',
        'BAD_REQUEST_ERROR'
      )
    }
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }
    throw errorHelper.internalServerError(
      'Error al eliminar la orden de compra',
      'DELETE_ORDER_ERROR'
    )
  }
}

export default deleteOrder
