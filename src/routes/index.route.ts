import express from 'express'
import userRoutes from './user.route'
import productRoutes from './product.route'
import orderRoute from './order.route'
import categoryRoute from './category.route'
import subcategoryRoute from './subcategory.route'
import imageRoutes from './image.route'

const router = express.Router()

router.use('/user', userRoutes)

router.use('/product', productRoutes)

router.use('/image', imageRoutes)

router.use('/order', orderRoute)

router.use('/category', categoryRoute)

router.use('/subcategory', subcategoryRoute)

export default router
