import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory } from '../controllers/subcategory/index.controller'

const router = express.Router()

router.get('/', getAllSubcategories)

router.get('/:id', getSubcategoryById)

router.post('/', authToken, authPermissions(['admin']), createSubcategory)

router.put('/:id', authToken, authPermissions(['admin']), updateSubcategory)

router.delete('/:id', authToken, authPermissions(['admin']), deleteSubcategory)

export default router