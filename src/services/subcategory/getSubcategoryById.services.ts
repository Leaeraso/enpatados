import subcategoryDTO from '../../dto/subcategory/subcategoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const getSubcategoryById = async (id: string) => {
    try {
        const subcategory = await subcategoryModel.findByPk(id)

        if(!subcategory) {
            throw errorHelper.notFoundError(
                'subcategoria no encontrada',
                'NOT_FOUND_ERROR'
            )
        }

        return subcategory.toJSON() as subcategoryDTO
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