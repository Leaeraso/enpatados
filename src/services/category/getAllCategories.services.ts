import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'

const getAllCategories = async (page: number, pageSize: number) => {
    try {
        const options = {
            limit: pageSize,
            offset: (page - 1) * pageSize
        }

        const {count, rows} = await categoryModel.findAndCountAll(options)

        if(rows.length === 0){
            throw errorHelper.notFoundError('Categorias no encontradas', 'NOT_FOUND_ERROR')
        }

        const categories: categoryDTO[] = rows.map((row) => {
            return row.toJSON() as categoryDTO
        })

        const totalPages = Math.ceil(count / pageSize)

        return {categories, count, totalPages}
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al obtener las categorias',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getAllCategories