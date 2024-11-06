import express from 'express'
import { registerUser, loginUser, authSession, passwordRecovery, resetPassword } from '../controllers/user/index.controllers'
import { authToken } from '../middlewares/middleware'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/auth/token', authToken, authSession)

router.get('/PassRecovery', passwordRecovery)

router.put('/:token', resetPassword)

export default router
