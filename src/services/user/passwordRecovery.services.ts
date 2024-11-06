import emailHelper from '../../helpers/emailHelper'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import errorHelper, { customError } from '../../helpers/error.helper'

dotenv.config()

const { SECRET_KEY } = process.env

const passwordRecovery = async (email: string) => {
    try {

        if (!SECRET_KEY) {
            throw new Error('SECRET_KEY no está definida en las variables de entorno')
        }

        console.log('creando token de recuperacion...')
        const verificationToken = jwt.sign(
            {email: email},
            SECRET_KEY,
            {expiresIn: '1h'}
        )

        console.log('llamando al servicio de email...')
        await emailHelper.sendPasswordRecoveryMail(email, verificationToken)
    } catch (error) {
        if (error instanceof customError) {
            throw error
          }
          
          console.error(error)
          throw errorHelper.internalServerError(
            'Error al recuperar la contraseña',
            'RECOVERY_PASSWORD_ERROR'
          )
    }
}

export default passwordRecovery