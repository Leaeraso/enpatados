import registerUserDTO from '../../dto/user/registerUserDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import userModel from '../../models/user/userModel.models'
import bcrypt from 'bcryptjs'

const updateUser = async (id: string, role: string, updatedData: Partial<registerUserDTO>) => {
    try {
        console.log('Obteniendo al usuario...');
        const user = await userModel.findByPk(id)

        if(!user) {
            throw errorHelper.notFoundError('Usuario no encontrado', 'NOT_FOUND_ERROR')
        }

        if(updatedData.role && role !='admin'){
            throw errorHelper.forbiddenError('No se puede modificar el rol de un usuario', 'FORBIDDEN_ERROR')
        }

        if(updatedData.password) {
            const hashedPassword = await bcrypt.hash(updatedData.password, 10)
            updatedData.password = hashedPassword
        }

        console.log('Actualizando datos...');
        await user.update(updatedData)

        return user
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al modificar el usuario',
            'CREATE_USER_ERROR'
        )
    }
}

export default updateUser