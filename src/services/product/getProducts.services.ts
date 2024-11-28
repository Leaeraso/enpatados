import productModel from '../../models/product/product.models'
import imageModel from '../../models/image/image.models'
import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'
import categoryModel from '../../models/category/category.models'

const getProducts = async () => {
  try {
    const products = await productModel.findAll({
      include: [
        {
          model: imageModel,
          as: 'images',
          attributes: ['url']
        },
        {
          model: subcategoryModel,
          as: 'subcategories',
          attributes: ['title']
        },
        {
          model: categoryModel,
          as: 'category',
          attributes: ['title']
        }
      ]
    })

    if (products.length === 0) {
      throw errorHelper.notFoundError(
        'Productos no encontrados',
        'NOT_FOUND_ERROR'
      )
    }

    const productsJSON: productDTO[] = products.map((product) => {
      return product.toJSON() as productDTO
    })

    return productsJSON
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al obtener los productos',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getProducts
