import orderProductDTO from '../../dto/order/orderProductDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import orderModel from '../../models/order/order.models'
import orderProductModel from '../../models/order/orderProduct.models'
import productModel from '../../models/product/product.models'
import dotenv from 'dotenv'

dotenv.config()

const { PHONE_NUMBER } = process.env

const createOrder = async (id: number, products: orderProductDTO[]) => {
  try {
    if (products.length === 0) {
      throw errorHelper.badRequestError(
        'No hay productos en el carrito',
        'BAD_REQUEST_ERROR'
      )
    }

    let total = 0

    for (const item of products) {
      const product = await productModel.findByPk(item.id)

      if (!product) {
        throw errorHelper.notFoundError(
          'Producto no encontrado',
          'NOT_FOUND_ERROR'
        )
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

    for (const item of products) {
      await orderProductModel.create({
        orderId: newOrder.orderNumber,
        productId: item.id,
        quantity: item.quantity,
        subtotal: item.quantity * item.price
      })
    }

    //falta agregar conexion con api de mercadoPago para pagar y descuentos
    const message = `Hola enpatados! Acabo de visitar su sitio web y he comprado unas medias, mi numero de orden es ${newOrder.orderNumber}`
    const whatsAppUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`

    return whatsAppUrl
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al crear la orden de compra',
      'CREATE_ORDER_ERROR'
    )
  }
}

export default createOrder
