import orderDTO from '../../dto/order/orderDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import productModel from '../../models/product/product.models'

const updateOrder = async (id: string, updatedOrder: Partial<orderDTO>) => {
    try {
        const order = await orderModel.findOne(
            {
                where: {
                    orderNumber: id
                },
                include: [
                    {
                        model: productModel,
                        attributes: ['name', 'stock', 'id'],
                    }
                ]
            })

        if(!order) {
            throw errorHelper.notFoundError('Orden no encontrada', 'NOT_FOUND_ERROR')
        }

        if(updatedOrder.discount) {
            const totalWithDisc = order.total - updatedOrder.discount

            updatedOrder.total = totalWithDisc
        }

        if(updatedOrder.status === 'pagado'){
            //Actualizar stock
        }

        await order.update(updatedOrder)

        return order
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al modificar la orden de compra',
            'UPDATE_ORDER_ERROR'
        )
    }
}

export default updateOrder