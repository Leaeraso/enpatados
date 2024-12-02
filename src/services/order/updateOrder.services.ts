import orderDTO from '../../dto/order/orderDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import productModel from '../../models/product/product.models'

type ProductWithOrderProduct = productModel & {
    OrderProduct: {
        quantity: number
    }
}

const updateOrder = async (id: number, updatedOrder: Partial<orderDTO>) => {
    try {
        const order = await orderModel.findOne(
            {
                where: {
                    orderNumber: id
                },
                include: [{
                    model: productModel,
                    as: 'products',
                    through: {
                        attributes: ['quantity']
                    }
                }]
            })

        if(!order) {
            throw errorHelper.notFoundError('Orden no encontrada', 'NOT_FOUND_ERROR')
        }

        if(updatedOrder.discount) {
            const totalWithDisc = order.total - updatedOrder.discount

            updatedOrder.total = totalWithDisc
        }

        console.log(order);

        if(updatedOrder.status === 'pagado'){
            if(!order.products || order.products.length === 0) {
                throw errorHelper.notFoundError('Productos no encontrados', 'NOT_FOUND_ERROR')
            }

            console.log(order.products);

            for(const product of order.products as ProductWithOrderProduct[]){
                const productId = product.id
                const quantityBought = product.OrderProduct.quantity

                await productModel.decrement('stock', {
                    by: quantityBought,
                    where: {
                        id: productId
                    }
                })
            }
        }

        await order.update(updatedOrder)

        return order
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      console.log(error);
        throw errorHelper.internalServerError(
            'Error al modificar la orden de compra',
            'UPDATE_ORDER_ERROR'
        )
    }
}

export default updateOrder