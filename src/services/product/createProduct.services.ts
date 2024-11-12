import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import productModel from '../../models/product/product.models'
import categoryModel from '../../models/category/category.models'

const createProduct = async (product: productDTO) => {
  try {
    await validateHelper(productModel, product)

    const existingProduct = await productModel.findOne({
      where: {
        name: product.name
      }
    })

    if (existingProduct !== null) {
      throw errorHelper.conflictError(
        'El producto ya existe',
        'PRODUCT_ALREADY_EXISTS'
      )
    }

    const category = categoryModel.findByPk(product.categoryId)

    if (!category) {
      throw errorHelper.notFoundError('No se ha encontrado la categoria', 'NOT_FOUND_ERROR')
    }

    await productModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      productType: product.productType,
      categoryId: product.categoryId
    })

  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al crear el producto',
      'CREATE_USER_ERROR'
    )
  }
}

export default createProduct
