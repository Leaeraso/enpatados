import getOrdersByUserId from './getOrdersByUserId.services'
import getOrderDetails from './getOrderDetails.services'
import createOrder from './createOrder.services'
import deleteOrder from './deleteOrder.services'
import getOrderById from './getOrderById.services'
import updateOrder from './updateOrder.services'
import getOrdersOfWeek from './getOrdersOfWeek.controller'

export default {
  getOrdersByUserId,
  getOrderDetails,
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
  getOrdersOfWeek
}
