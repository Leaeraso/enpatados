import productModel from '../../models/product/product.models'
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

    const productsJSON: productDTO[] = products.map((product) => {
      const { id, name, description, price, imageUrl, productType, categoryId } = product
      
      return { id, name, description, price, imageUrl, productType, categoryId }
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
