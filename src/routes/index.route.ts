import express from 'express'
import userRoutes from './user.route'
import productRoutes from './product.route'
import orderRoute from './order.route'
import categoryRoute from './category.route'

const router = express.Router()

router.use('/user', userRoutes)

router.use('/product', productRoutes)

router.use('/order', orderRoute)

router.use('/category', categoryRoute)

export default router
