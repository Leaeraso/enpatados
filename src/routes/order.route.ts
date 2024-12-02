import express from 'express'
import { authPermissions, authToken } from '../middlewares/middleware'
import {
  getOrdersByUserId,
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
  getOrdersOfWeek
} from '../controllers/order/index.controller'

const router = express.Router()

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     tags:
 *       - orders
 *     summary: Obtener ordenes de compra de un usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve un array de ordenes de un usuario
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error al obtener las ordenes de compra
 *     security:
 *       - bearerAuth: []
 */
router.get('/user/:id', authToken, getOrdersByUserId)

//router.get('/details/:id', authToken, getOrderDetails)

/**
 * @openapi
 * /order/:
 *   get:
 *     tags:
 *       - orders
 *     summary: Obtener las ordenes de la semana
 *     responses:
 *       200:
 *         description: Retorna un array de ordenes
 *       500:
 *         description: Error al obtener las ordenes de compra
 *     security:
 *       - bearerAuth: []
 */
router.get('/week', authToken, authPermissions(['admin', 'god']), getOrdersOfWeek)

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     tags:
 *       - orders
 *     summary: Obtener orden de compra por id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve una orden de compra
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error al obtener la orden de compra
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authToken, authPermissions(['admin', 'god']), getOrderById)

/**
 * @openapi
 * /order/:
 *   post:
 *     tags:
 *       - orders
 *     summary: Crear una orden de compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/order'
 *     responses:
 *       201:
 *         description: Orden creada con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al crear la orden de compra
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authToken, createOrder)

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     tags:
 *       - orders
 *     summary: Actualizar datos de una orden de compra
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
 *             $ref: '#/components/schemas/order'
 *     responses:
 *       200:
 *         description: Devuelve la nueva orden
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error al actualizar los datos de la orden de compra
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, updateOrder)

//router.post('/payment', authToken, processPayment)

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     tags:
 *       - orders
 *     summary: Eliminar una orden de compra
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
 *             $ref: '#/components/schemas/order'
 *     responses:
 *       200:
 *         description: Orden eliminada con exito
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error al eliminar la orden de compra
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authToken, deleteOrder)

export default router
