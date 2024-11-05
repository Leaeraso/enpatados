import express from 'express'
import { registerUser, loginUser, validateRegistration } from '../controllers/user/index.controllers'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('validation', validateRegistration)

export default router
