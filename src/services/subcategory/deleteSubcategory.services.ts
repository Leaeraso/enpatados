import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const deleteSubcategory = async (id: number) => {
    try {
        const deletedSubcategory = await subcategoryModel.destroy({
            where: {
                id: id
            }
        })

        if(deletedSubcategory === 0) {
            throw errorHelper.badRequestError(
                'Subcategoria no encontrada',
                'BAD_REQUEST_ERROR'
            )
        }
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al eliminar la subcategoria',
            'DELETE_SUBCATEGORY_ERROR'
        )
    }
}

export default deleteSubcategory