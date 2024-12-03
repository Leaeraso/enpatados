import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'
import categoryModel from '../../models/category/category.models'

const getCategoryById = async (id: number) => {
    try {
        const category = await categoryModel.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: subcategoryModel,
                    as: 'subcategories',
                    attributes: ['id','name']
                }
            ]
        })

        if(!category) {
            throw errorHelper.notFoundError(
                'Categoria no encontrada',
                'NOT_FOUND_ERROR'
            )
        }

        return category.toJSON() as categoryDTO
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al obtener la categoria',
            'INTERNAL_SERVER_ERROR'
        )
    }
}

export default getCategoryById