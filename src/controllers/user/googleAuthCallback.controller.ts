import passport from 'passport'
import '../../docs/passport'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import userService from '../../services/user/index.services'

dotenv.config()

const {SECRET_KEY, CORS} = process.env

if(!SECRET_KEY || !CORS){
    throw new Error('SECRET_KEY no está definida en las variables de entorno')
}

export const authGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
})

export const googleAuthCallback = (req: Request, res: Response) => {
    const user = req.user as any

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: process.env.EXPIRE_TOKEN }
    )

    res.redirect(`${CORS[0]}/auth/google?token=${token}`)
}