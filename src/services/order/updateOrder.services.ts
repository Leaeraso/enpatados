import orderDTO from '../../dto/order/orderDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'

const updateOrder = async (id: string, updatedOrder: Partial<orderDTO>) => {
    try {
        const order = await orderModel.findByPk(id)

        if(!order) {
            throw errorHelper.notFoundError('Orden no encontrada', 'NOT_FOUND_ERROR')
        }

        if(updatedOrder.discount) {
            const totalWithDisc = order.total - updatedOrder.discount

            updatedOrder.total = totalWithDisc
        }

        await order.update(updatedOrder)

        return order
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al modificar el usuario',
            'CREATE_USER_ERROR'
        )
    }
}

export default updateOrder