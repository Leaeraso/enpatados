import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory } from '../controllers/subcategory/index.controller'

const router = express.Router()

/**
 * @openapi
 * /subcategory/:
 *   get:
 *     tags:
 *       - subcategories
 *     summary: Obtener subcategorias
 *     responses:
 *       200:
 *         description: Retorna array de subcategorias
 *       500:
 *         description: Error al obtener las subcategorias
 */
router.get('/', getAllSubcategories)

/**
 * @openapi
 * /subcategory/{id}:
 *   get:
 *     tags:
 *       - subcategories
 *     summary: Obtener subcategoria por id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve una subcategoria
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error al obtener la subcategoria
 */
router.get('/:id', getSubcategoryById)

/**
 * @openapi
 * /subcategory/:
 *   post:
 *     tags:
 *       - subcategories
 *     summary: crear una subcategoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subcategory'
 *     responses:
 *       201:
 *         description: Subcategoria creada con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al crear la subcategoria
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authToken, authPermissions(['admin']), createSubcategory)

/**
 * @openapi
 * /subcategory/{id}:
 *   put:
 *     tags:
 *       - subcategories
 *     summary: Actualizar datos de una subcategoria
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
 *             $ref: '#/components/schemas/subcategory'
 *     responses:
 *       200:
 *         description: Devuelve la nueva subcategoria
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error al actualizar los datos de la subcategoria
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, authPermissions(['admin']), updateSubcategory)

/**
 * @openapi
 * /subcategory/{id}:
 *   delete:
 *     tags:
 *       - subcategories
 *     summary: Eliminar una subcategoria
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
 *             $ref: '#/components/schemas/subcategory'
 *     responses:
 *       200:
 *         description: Subcategoria eliminada exitosamente
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error al eliminar la subcategoria
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authToken, authPermissions(['admin']), deleteSubcategory)

export default router