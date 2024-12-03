import errorHelper, { customError } from '../../helpers/error.helper'
import imageModel from '../../models/image/image.models'

const deleteImage = async (id: number) => {
  try {
    const deletedImage = await imageModel.destroy({
      where: {
        id: id
      }
    })

    if (deletedImage === 0) {
      throw errorHelper.badRequestError(
        'Imagen no encotrado',
        'BAD_REQUEST_ERROR'
      )
    }
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al eliminar la imagen',
      'DELETE_IMAGE_ERROR'
    )
  }
}

export default deleteImage
