import { Request, Response } from 'express'
import imageService from '../../services/image/index.services'
import { customError } from '../../helpers/error.helper'

const updateImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const updatedData = req.body

    const image = await imageService.updateImage(Number(id), updatedData)

    res.status(200).json({ image })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default updateImage
