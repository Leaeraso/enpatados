import express from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product/index.controller'
import { authPermissions, authToken } from '../middlewares/middleware'

const router = express.Router()

router.get('/', authToken, getProducts)

router.get('/:id', authToken, getProduct)

router.post('/', authToken, authPermissions(['admin', 'god']), createProduct)

router.put('/:id', authToken, authPermissions(['admin', 'god']), updateProduct)

router.delete(
  '/:id',
  authToken,
  authPermissions(['admin', 'god']),
  deleteProduct
)

export default router
