import express from 'express'
import userRoutes from './user.route'

const router = express.Router()

router.use('/user', userRoutes)

export default router
