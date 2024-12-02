import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import orderDTO from '../../dto/order/orderDTO'
import productModel from '../../models/product/product.models'
import imageModel from '../../models/image/image.models'
import userModel from '../../models/user/userModel.models'

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
                        as: 'products',
                        attributes: ['name'],
                        include: [
                            {
                                model: imageModel,
                                as: 'images',
                                attributes: ['url'],
                            }
                        ]
                    },
                    {
                        model: userModel,
                        attributes: ['name', 'surname']
                    }
                ]
            })

        console.log(order);

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