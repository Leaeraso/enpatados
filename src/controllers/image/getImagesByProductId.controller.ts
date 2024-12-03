import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import imageService from '../../services/image/index.services'

const getImagesByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id

    const images = await imageService.getImagesByProductId(Number(productId))

    res.status(200).json(images)
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default getImagesByProductId
