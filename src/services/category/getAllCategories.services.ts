import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import categoryModel from '../../models/category/category.models'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const getAllCategories = async () => {
    try {
        const categories = await categoryModel.findAll({
            include: [
                {
                    model: subcategoryModel,
                    as: 'subcategories',
                    attributes: ['name']
                }
            ]
        })

        if(categories.length === 0){
            throw errorHelper.notFoundError('Categorias no encontradas', 'NOT_FOUND_ERROR')
        }

        const categoriesDTO: categoryDTO[] = categories.map((category) => {
            return category.toJSON()
        })

        return categoriesDTO
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