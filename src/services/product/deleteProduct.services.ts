import errorHelper, { customError } from '../../helpers/error.helper'
import productModel from '../../models/product/product.models'

const deleteProduct = async (id: number) => {
  try {
    const deletedProduct = await productModel.destroy({
      where: {
        id: id
      }
    })

    if (deletedProduct === 0) {
      throw errorHelper.badRequestError(
        'Producto no encotrado',
        'BAD_REQUEST_ERROR'
      )
    }
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al eliminar el producto',
      'CREATE_USER_ERROR'
    )
  }
}

export default deleteProduct
