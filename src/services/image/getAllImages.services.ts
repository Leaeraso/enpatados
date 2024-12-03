import errorHelper, { customError } from "../../helpers/error.helper"
import imageModel from '../../models/image/image.models'
import productModel from '../../models/product/product.models'

const getAllImages = async (page: number, pageSize: number) => {
    try {
        let options = {
            limit: pageSize,
            offset: (page - 1) * pageSize
        }

        const {count, rows} = await imageModel.findAndCountAll({
            ...options,
            distinct: true,
            include: [
                {
                    model: productModel,
                    as: 'product',
                    attributes: ['name']
                }
            ]
        })

        if(rows.length === 0) {
            throw errorHelper.notFoundError(
                'Imagenes no encontradas',
                'NOT_FOUND_ERROR'
              )
        }

        const totalCounts = Array.isArray(count) ? count.reduce((sum, group) => sum + group.count, 0) : count

        const images = rows.map((row) => row.toJSON())

        const totalPages = Math.ceil(totalCounts / pageSize)

        return {images, count, totalPages}
    } catch (error) {
        if (error instanceof customError) {
            throw error
          }
          console.log(
            error
          );
          throw errorHelper.internalServerError(
            'Error al obtener las imagenes',
            'INTERNAL_SERVER_ERROR'
          )
    }
}

export default getAllImages