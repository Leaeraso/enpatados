import express from 'express'
import { registerUser, loginUser, authSession, passwordRecovery, resetPassword, updateUser, getUserById } from '../controllers/user/index.controller'
import { authToken } from '../middlewares/middleware'

const router = express.Router()

router.get('/auth/token', authToken, authSession)

router.get('/PassRecovery', passwordRecovery)

router.get('/:id', authToken, getUserById)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.put('/reset/:token', resetPassword)

router.put('/:id', authToken, updateUser)

export default router