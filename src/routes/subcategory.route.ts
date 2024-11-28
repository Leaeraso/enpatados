import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory } from '../controllers/subcategory/index.controller'

const router = express.Router()

router.get('/', authToken, getAllSubcategories)

router.get('/:id', authToken, getSubcategoryById)

router.post('/', authToken, authPermissions(['admin', 'god']), createSubcategory)

router.put('/:id', authToken, authPermissions(['admin', 'god']), updateSubcategory)

router.delete('/:id', authToken, authPermissions(['admin', 'god']), deleteSubcategory)

export default router