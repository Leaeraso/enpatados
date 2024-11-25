import categoryDTO from '../../dto/category/categoryDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import categoryModel from '../../models/category/category.models'

const createCategory = async(category : categoryDTO) => {
    try {
        await validateHelper(categoryModel, category)

        const existingCategory = await categoryModel.findOne({
            where: {
                title: category.title
            }
        })

        if(existingCategory !== null) {
            throw errorHelper.conflictError(
                'La categoria ya existe',
                'PRODUCT_ALREADY_EXISTS'
            )
        }

        await categoryModel.create({
            title: category.title,
            subtitle: category.subtitle,
            icon: category.icon
        })
    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al crear la categoria',
            'CREATE_CATEGORY_ERROR'
        )
    }
}

export default createCategory