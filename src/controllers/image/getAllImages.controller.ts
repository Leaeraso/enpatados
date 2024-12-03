import { Request, Response } from 'express'
import imageService from '../../services/image/index.services'
import { customError } from '../../helpers/error.helper'

const getAllImages = async (req: Request, res: Response) => {
  try {
    const {page = 1, pageSize = 10} = req.query
    const {images, totalPages, count} = await imageService.getAllImages(Number(page), Number(pageSize))

    res.status(200).json({
      data: images,
      pagination: {
        currentPage: +page,
        totalPages,
        totalRecords: count,
        pageSize: +pageSize
      }
    })
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message })
    } else {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export default getAllImages
