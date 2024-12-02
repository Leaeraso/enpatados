import productModel from '../../models/product/product.models'
import imageModel from '../../models/image/image.models'
import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import subcategoryModel from '../../models/subcategory/subcategory.models'
import categoryModel from '../../models/category/category.models'

const getProducts = async (page: number, pageSize: number) => {
  try {
    let options = {
      limit: pageSize,
      offset: (page - 1) * pageSize
    }

    const {count, rows} = await productModel.findAndCountAll({
      ...options,
      include: [
        {
          model: imageModel,
          as: 'images',
          attributes: ['url']
        },
        {
          model: subcategoryModel,
          as: 'subcategory',
          attributes: ['name']
        },
        {
          model: categoryModel,
          as: 'category',
          attributes: ['name']
        }
      ]
    })

    if (rows.length === 0) {
      throw errorHelper.notFoundError(
        'Productos no encontrados',
        'NOT_FOUND_ERROR'
      )
    }

    const products: productDTO[] = rows.map((row) => {
      return row.toJSON() as productDTO
    })

    const totalPages = Math.ceil(count / pageSize)

    return {products, totalPages, count}
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }
console.log(error);
    throw errorHelper.internalServerError(
      'Error al obtener los productos',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getProducts
