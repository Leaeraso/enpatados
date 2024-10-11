import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import productModel from '../../models/product/productModel.models'

const updateProduct = async (id: number, updatedData: Partial<productDTO>) => {
  try {
    const product = await productModel.findByPk(id)

    if (!product) {
      throw errorHelper.notFoundError(
        'Producto no encontrado',
        'NOT_FOUND_ERROR'
      )
    }

    await product.update(updatedData)

    return product
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al modificar el producto',
      'CREATE_USER_ERROR'
    )
  }
}

export default updateProduct
