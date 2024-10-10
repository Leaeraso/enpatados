import productModel from '../../models/product/productModel.models'
import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'

const getProducts = async () => {
  try {
    const products = await productModel.findAll()

    if (products.length === 0) {
      throw errorHelper.notFoundError(
        'Productos no encontrados',
        'NOT_FOUND_ERROR'
      )
    }

    const productArray: productDTO[] = products.map((product) => {
      return product.toJSON() as productDTO
    })

    return productArray
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
