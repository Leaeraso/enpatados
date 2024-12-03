import imageDTO from '../../dto/image.imageDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import imageModel from '../../models/image/image.models'


const updateImage = async (id: number, updatedData: Partial<imageDTO>) => {
  try {
    const image = await imageModel.findByPk(id)

    if (!image) {
      throw errorHelper.notFoundError(
        'Imagen no encontrado',
        'NOT_FOUND_ERROR'
      )
    }

    await image.update(updatedData)

    return image
  } catch (error) {
    if (error instanceof customError) {
      throw error
    }

    throw errorHelper.internalServerError(
      'Error al modificar la imagen',
      'UPDATE_IMAGE_ERROR'
    )
  }
}

export default updateImage