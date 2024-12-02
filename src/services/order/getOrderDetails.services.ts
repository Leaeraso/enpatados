import orderDetailsDTO from '../../dto/order/orderDetailsDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderProductModel from '../../models/order/orderProduct.models'
import productModel from '../../models/product/product.models'

const getOrderDetails = async (id: number) => {
  try {
    const details = await orderProductModel.findAll({
      where: {
        orderId: id
      },
      include: [
        {
          model: productModel,
          attributes: ['name'],
          as: 'Product'
        }
      ]
    })

    if (details.length === 0) {
      throw errorHelper.notFoundError(
        'No se encontraron los productos',
        'BAD_RESQUEST_ERROR'
      )
    }

    const orderDetails: orderDetailsDTO[] = details.map((detail) => {
      const product = detail.get('Product') as { name: string } | null
      console.log('Producto:', product)
      const detailData = detail.toJSON() as orderDetailsDTO
      return {
        ...detailData,
        productName: product ? product.name : null
      }
    })

    const filteredOrderDetails = orderDetails.map(
      ({ Product, ...rest }) => rest
    )

    return filteredOrderDetails
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }
    console.log('Error;', error)
    throw errorHelper.internalServerError(
      'Error al obtener los productos',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getOrderDetails
