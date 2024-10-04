import express from 'express'
import userRoutes from './user.route'
import productRoutes from './product.route'

const router = express.Router()

router.use('/user', userRoutes)

router.use('/product', productRoutes)

export default router
