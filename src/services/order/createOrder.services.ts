import orderProductDTO from '../../dto/order/orderProductDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import orderProductModel from '../../models/order/orderProduct.models'
import productModel from '../../models/product/productModel.models'

const createOrder = async (id: number, products: orderProductDTO[]) => {
  try {
    if (products.length === 0) {
      errorHelper.badRequestError(
        'No hay productos en el carrito',
        'BAD_REQUEST_ERROR'
      )
    }

    let total = 0

    for (const item of products) {
      const product = await productModel.findByPk(item.id)

      if (!product) {
        errorHelper.notFoundError('Producto no encontrado', 'NOT_FOUND_ERROR')
      }

      total += item.price * item.quantity
    }

    const newOrder = await orderModel.create({
      date: new Date(),
      total: total,
      status: 'creado',
      userId: id,
      discount: 0
    })
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al crear el producto',
      'CREATE_USER_ERROR'
    )
  }
}

export default createOrder
