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

/**
 * @openapi
 * /product/:
 *   get:
 *     tags:
 *       - products
 *     summary: Obtener productos
 *     responses:
 *       200:
 *         description: Retorna array de productos
 *       500:
 *         description: Error al obtener los productos
 *     security:
 *       - bearerAuth: []
 */
router.get('/', getProducts)

/**
 * @openapi
 * /product/{id}:
 *   get:
 *     tags:
 *       - products
 *     summary: Obtener producto por id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve el producto
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error al obtener el producto
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', getProduct)

/**
 * @openapi
 * /product/:
 *   post:
 *     tags:
 *       - products
 *     summary: Registrar un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: Producto registrado con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al registrar el producto
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authToken, authPermissions(['admin', 'god']), createProduct)

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     tags:
 *       - products
 *     summary: Actualizar datos del producto
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Devuelve el nuevo producto
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error al actualizar los datos del producto
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, authPermissions(['admin', 'god']), updateProduct)

/**
 * @openapi
 * /producto/{id}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Eliminar un producto
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Producto eliminado con exito
 *       404:
 *         description: User not found
 *       500:
 *         description: Error al eliminar el producto
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authToken, authPermissions(['admin', 'god']), deleteProduct)

export default router
