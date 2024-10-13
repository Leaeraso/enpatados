// import orderDTO from '../../dto/order/orderDTO'
import { customError } from '../../helpers/error.helper'
import errorHelper from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'

const updateOrderStatus = async (id: number, newState: { status: string }) => {
  try {
    const { status } = newState

    const validStatuses = ['creado', 'pendiente', 'pagado', 'cancelado']

    if (!validStatuses.includes(status)) {
      throw errorHelper.badRequestError('Estado invalido', 'BAD_REQUEST_ERROR')
    }

    const order = await orderModel.findByPk(id)

    if (!order) {
      throw errorHelper.notFoundError('Orden no encontrada', 'NOT_FOUND_ERROR')
    }

    await order.update({
      status: status
    })

    return order
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    console.log('error:', error)

    throw errorHelper.internalServerError(
      'Error al modificar el estado de la orden',
      'CREATE_USER_ERROR'
    )
  }
}

export default updateOrderStatus
