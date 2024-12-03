import userDTO from '../../dto/user/userDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import userModel from '../../models/user/userModel.models'

const getUsers = async (page: number, pageSize: number) => {
    try {
        let options = {
            limit: pageSize,
            offset: (page - 1) * pageSize
        }

        const {count, rows} = await userModel.findAndCountAll({
            ...options,
            distinct: true
        })

        if(rows.length === 0){
            throw errorHelper.notFoundError(
                'Usuarios no encontrados',
                'NOT_FOUND_ERROR'
              )
        }

        const users: userDTO[] = rows.map((row) => {
            const {id, name, surname, email} = row.toJSON()
            return {id, name, surname, email}
        })

        const totalPages = Math.ceil(count / pageSize)

        return {users, totalPages, count}
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      console.log(error);
        throw errorHelper.internalServerError(
            'Error al obtener los usuarios',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getUsers