import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'

const deleteCategory = async (id: number) => {
    try {
        const deletedCategory = await categoryModel.destroy({
            where: {
                id: id
            }
        })

        if(deletedCategory === 0) {
            throw errorHelper.badRequestError(
                'Categoria no encontrada',
                'BAD_REQUEST_ERROR'
            )
        }
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al eliminar la categoria',
            'CREATE_USER_ERROR'
        )
    }
}

export default deleteCategory