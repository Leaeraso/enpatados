import { Request, Response } from 'express'
import imageService from '../../services/image/index.services'
import { customError } from '../../helpers/error.helper'

const createImage = async (req: Request, res:Response) => {
    try {
        const image = req.body

        await imageService.createImage(image)

        res.status(201).json({mesage: 'Imagen creada con exito'})
    } catch (error) {
        if (error instanceof customError) {
            res.status(error.httpStatus).json({ error: error.message })
        } else {
            res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default createImage