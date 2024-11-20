import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'

const updateCategory = async (id: number, updatedData: Partial<categoryDTO>) => {
    try {
        const category = await categoryModel.findByPk(id)

        if(!category) {
            throw errorHelper.notFoundError(
                'Categoria no encontrada',
                'NOT_FOUND_ERROR'
            )
        }

        await category.update(updatedData)

        return category
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al modificar la categoria',
            'UPDATE_CATEGORY_ERROR'
        )
    }
}

export default updateCategory