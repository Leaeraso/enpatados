import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import {getImagesByProductId, updateImage, deleteImage, getAllImages, createImage} from '../controllers/image/index.controller'

const router = express.Router()

/**
 * @openapi
 * /image/:
 *   get:
 *     tags:
 *       - images
 *     summary: Obtener imagenes
 *     responses:
 *       200:
 *         description: Retorna array de imagenes
 *       500:
 *         description: Error al obtener las imagenes
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authToken, authPermissions(['admin']), getAllImages)

/**
 * @openapi
 * /image/{id}:
 *   get:
 *     tags:
 *       - images
 *     summary: Obtener imagen por id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve una imagen
 *       404:
 *         description: Image not found
 *       500:
 *         description: Error al obtener la imagen
*     security:
 *       - bearerAuth: []
 */
router.get('/:id', authToken, authPermissions(['admin']), getImagesByProductId)

/**
 * @openapi
 * /image/:
 *   post:
 *     tags:
 *       - images
 *     summary: crear una imagen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/image'
 *     responses:
 *       201:
 *         description: Imagen creada con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al crear la imagen
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authToken, authPermissions(['admin']), createImage)

/**
 * @openapi
 * /image/{id}:
 *   put:
 *     tags:
 *       - images
 *     summary: Actualizar datos de una imagen
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
 *             $ref: '#/components/schemas/image'
 *     responses:
 *       200:
 *         description: Devuelve la nueva imagen
 *       404:
 *         description: Image not found
 *       500:
 *         description: Error al actualizar los datos de la imagen
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, authPermissions(['admin']), updateImage)

/**
 * @openapi
 * /image/{id}:
 *   delete:
 *     tags:
 *       - images
 *     summary: Eliminar una imagen
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
 *             $ref: '#/components/schemas/image'
 *     responses:
 *       200:
 *         description: Imagen eliminada exitosamente
 *       404:
 *         description: Image not found
 *       500:
 *         description: Error al eliminar la imagen
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authToken, authPermissions(['admin']), deleteImage)

export default router