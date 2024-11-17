import errorHelper, { customError } from "../../helpers/error.helper"
import userModel from '../../models/user/userModel.models'
import userDTO from '../../dto/user/registerUserDTO'

const getUserById = async (id: number, userId: number, userRole: string) => {
    try {
        if(userRole !== 'admin' && id !== userId) {
            throw errorHelper.forbiddenError('No cuentas con los permisos necesarios', 'FORBIDDEN_ERROR')
        }

        const user = await userModel.findByPk(id)

        if(!user) {
            throw errorHelper.notFoundError('No se ha encontrado al usuario', 'NOT_FOUND_ERROR')
        }

        const {name, surname, email, dob} = user?.toJSON() as userDTO

        return {name, surname, email, dob}
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al obtener los productos',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getUserById