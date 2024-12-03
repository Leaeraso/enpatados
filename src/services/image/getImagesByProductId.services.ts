import errorHelper, { customError } from '../../helpers/error.helper'
import imageModel from '../../models/image/image.models'

const getImagesByProductId = async (id: number) => {
  try {

    const rows = await imageModel.findAll({
      where: {
        productId: id
      }
    })

    if(rows.length === 0) {
      throw errorHelper.notFoundError(
        'Imagenes no encontradas',
        'NOT_FOUND_ERROR'
      )
    }

    const images = rows.map((row) => row.toJSON())

    return images
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al obtener las imagenes del producto',
      'INTERNAL_SERVER_ERROR'
    )
  }
}

export default getImagesByProductId
