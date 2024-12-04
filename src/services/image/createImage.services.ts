import imageDTO from '../../dto/image.imageDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import imageModel from '../../models/image/image.models'

const createImage = async(image: imageDTO) => {
    try {
        await validateHelper(imageModel, image)

        const existingImage = await imageModel.findOne({
            where: {
                url: image.url,
            }
        })

        if(existingImage !== null) {
            throw errorHelper.conflictError(
                'La imagen ya existe',
                'IMAGE_ALREADY_EXISTS'
            )
        }

        await imageModel.create({
            url: image.url,
            productId: image.productId
        })

    } catch (error) {
        if (error instanceof customError) {
            throw error
        }
      
        throw errorHelper.internalServerError(
            'Error al crear la imagen',
            'CREATE_IMAGE_ERROR'
        )
    }
}

export default createImage