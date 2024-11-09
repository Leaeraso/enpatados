import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category/index.controller'

const router = express.Router()

router.get('/', authToken, getAllCategories)

router.get('/:id', authToken, getCategoryById)

router.post('/', authToken, authPermissions(['admin', 'god']), createCategory)

router.put('/:id', authToken, authPermissions(['admin', 'god']), updateCategory)

router.delete('/:id', authToken, authPermissions(['admin', 'god']), deleteCategory)

export default router