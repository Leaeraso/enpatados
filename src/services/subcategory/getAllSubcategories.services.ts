import subcategoryDTO from '../../dto/subcategory/subcategoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const getAllSubcategories = async () => {
    try {
        const subcategories = await subcategoryModel.findAll()

        if(subcategories.length === 0){
            throw errorHelper.notFoundError('Subcategorias no encontradas', 'NOT_FOUND_ERROR')
        }

        const subcategoriesArray: subcategoryDTO[] = subcategories.map((subcategory) => {
            return subcategory.toJSON() as subcategoryDTO
        })

        return subcategoriesArray
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al obtener las subcategorias',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getAllSubcategories