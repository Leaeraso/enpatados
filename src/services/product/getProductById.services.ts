import productModel from '../../models/product/product.models'
import productDTO from '../../dto/product/productDTO'
import errorHelper from '../../helpers/error.helper'
import { customError } from '../../helpers/error.helper'

const getProductById = async (id: string) => {
  try {
    const product = await productModel.findByPk(id)

    if (product === null) {
      throw errorHelper.notFoundError(
        'Producto no encontrado',
        'NOT_FOUND_ERROR'
      )
    }

    const productToReturn: productDTO = product.toJSON() as productDTO

    return productToReturn
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

export default getProductById
