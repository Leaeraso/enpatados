import express from 'express'
import { authPermissions, authToken } from '../middlewares/middleware'
import {
  getOrdersByUserId,
  getOrderDetails,
  createOrder,
  processPayment,
  deleteOrder,
  getOrderById,
  updateOrder,
  getOrdersOfWeek
} from '../controllers/order/index.controller'

const router = express.Router()

router.get('/user/:id', authToken, getOrdersByUserId)

router.get('/details/:id', authToken, getOrderDetails)

router.get('/weekly', authToken, authPermissions(['admin', 'god']), getOrdersOfWeek)

router.get('/:id', authToken, authPermissions(['admin', 'god']), getOrderById)

router.post('/', authToken, createOrder)

router.put('/:id', authToken, updateOrder)

router.post('/payment', authToken, processPayment)

router.delete('/:id', authToken, deleteOrder)



export default router
