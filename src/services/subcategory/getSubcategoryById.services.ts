import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'

const getSubcategoryById = async (id: string) => {
    try {
        const subcategory = await categoryModel.findByPk(id)

        if(!subcategory) {
            throw errorHelper.notFoundError(
                'Categoria no encontrada',
                'NOT_FOUND_ERROR'
            )
        }

        return subcategory.toJSON() as categoryDTO
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al obtener la subccategoria',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getSubcategoryById