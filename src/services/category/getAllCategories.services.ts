import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'

const getAllCategories = async () => {
    try {
        const categories = await categoryModel.findAll()

        if(categories.length === 0){
            throw errorHelper.notFoundError('Categorias no encontradas', 'NOT_FOUND_ERROR')
        }

        const categoriesArray: categoryDTO[] = categories.map((category) => {
            return category.toJSON() as categoryDTO
        })

        return categoriesArray
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