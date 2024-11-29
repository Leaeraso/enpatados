import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryDTO from '../../dto/subcategory/subcategoryDTO'
import validateHelper from '../../helpers/validateHelper'
import categoryModel from '../../models/category/category.models'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const createSubcategory = async(subcategory : subcategoryDTO) => {
    try {
        await validateHelper(subcategoryModel, subcategory)

        const existingSubcategory = await subcategoryModel.findOne({
            where: {
                name: subcategory.name
            }
        })

        if(existingSubcategory !== null) {
            throw errorHelper.conflictError(
                'La subcategoria ya existe',
                'SUBCATEGORY_ALREADY_EXISTS'
            )
        }

        const existingCategory = await categoryModel.findByPk(subcategory.categoryId)

        if(existingCategory === null) {
            throw errorHelper.notFoundError(
                'La categoria no existe',
                'CATEGORY_ALREADY_EXISTS'
            )
        }

        await subcategoryModel.create({
            name: subcategory.name,
            categoryId: subcategory.categoryId
        })
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al crear la subcategoria',
            'CREATE_SUBCATEGORY_ERROR'
        )
    }
}

export default createSubcategory