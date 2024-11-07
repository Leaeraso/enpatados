import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import orderDTO from '../../dto/order/orderDTO'
// import orderProductModel from '../../models/order/orderProduct.models'
import productModel from '../../models/product/productModel.models'

const getOrderById = async (id: string) => {
    try {

        console.log('obteniendo orden de la base de datos')
        const order = await orderModel.findOne(
            {
                where: {
                    orderNumber: id
                },
                include: [
                    {
                        model: productModel,
                        attributes: ['name', 'imageUrl'],
                    }
                ]
            })

        if(order === null) {
            throw errorHelper.notFoundError('Orden no encontrada',
        'NOT_FOUND_ERROR')
        }

        const orderJSON: orderDTO = order.toJSON() as orderDTO

        console.log(orderJSON)

        return orderJSON
    } catch (error) {
        if (error instanceof customError) {
            throw error
          }
          
          console.error(error);
          throw errorHelper.internalServerError(
            'Error al obtener la orden de compra',
            'INTERNAL_SERVER_ERROR'
          )
    }
}

export default getOrderById