import express from 'express'
import { authToken, authPermissions } from '../middlewares/middleware'
import {getImagesByProductId, updateImage, deleteImage, getAllImages} from '../controllers/image/index.controller'

const router = express.Router()

router.get('/', authToken, authPermissions(['admin']), getAllImages)

router.get('/:id', authToken, authPermissions(['admin']), getImagesByProductId)

router.put('/:id', authToken, authPermissions(['admin']), updateImage)

router.delete('/:id', authToken, authPermissions(['admin']), deleteImage)

export default router