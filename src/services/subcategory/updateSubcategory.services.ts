import subcategoryDTO from '../../dto/subcategory/subcategoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const updateSubcategory = async (id: number, updatedData: Partial<subcategoryDTO>) => {
    try {
        const subcategory = await subcategoryModel.findByPk(id)

        if(!subcategory) {
            throw errorHelper.notFoundError(
                'Subcategoria no encontrada',
                'NOT_FOUND_ERROR'
            )
        }

        await subcategory.update(updatedData)

        return subcategory
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al modificar la subcategoria',
            'UPDATE_SUBCATEGORY_ERROR'
        )
    }
}

export default updateSubcategory