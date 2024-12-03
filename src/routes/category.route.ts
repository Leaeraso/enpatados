import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category/index.controller'

const router = express.Router()

/**
 * @openapi
 * /category/:
 *   get:
 *     tags:
 *       - categories
 *     summary: Obtener categorias
 *     responses:
 *       200:
 *         description: Retorna array de categorias
 *       500:
 *         description: Error al obtener las categorias
 */
router.get('/', getAllCategories)

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - categories
 *     summary: Obtener categoria por id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve una categoria
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error al obtener la categoria
 */
router.get('/:id', getCategoryById)

/**
 * @openapi
 * /category/:
 *   post:
 *     tags:
 *       - categories
 *     summary: crear una categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       201:
 *         description: Categoria creada con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al crear la categoria
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authToken, authPermissions(['admin', 'god']), createCategory)

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     tags:
 *       - categories
 *     summary: Actualizar datos de una categoria
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
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       200:
 *         description: Devuelve la nueva categoria
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error al actualizar los datos de la categoria
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, authPermissions(['admin', 'god']), updateCategory)

/**
 * @openapi
 * /category/{id}:
 *   delete:
 *     tags:
 *       - categories
 *     summary: Eliminar una categoria
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
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       200:
 *         description: Categoria eliminada exitosamente
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error al eliminar la categoria
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authToken, authPermissions(['admin', 'god']), deleteCategory)

export default router