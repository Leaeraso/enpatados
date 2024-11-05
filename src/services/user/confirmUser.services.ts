import errorHelper from "../../helpers/error.helper"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../../models/user/userModel.models'

dotenv.config()

const { SECRET_KEY } = process.env

const confirmUser = async(token: string) => {
    try {
        if(!token) {
            throw errorHelper.badRequestError('Token no encontrado', 'BAD_REQUEST_ERROR')
        }
    
        if (!SECRET_KEY) {
            throw new Error('SECRET_KEY no está definida en las variables de entorno')
          }
    
        const decoded = jwt.verify(token as string, SECRET_KEY as string) as {emial: string}
    
        await userModel.update({isValidated: true},
            {
                where: {email: decoded.emial}
            }
        )
    } catch (error) {
        throw errorHelper.internalServerError(
            'Error al confirmar el registro del usuario',
            'CREATE_USER_ERROR'
          )
    }
}

export default confirmUser