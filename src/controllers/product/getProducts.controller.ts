import { Request, Response } from 'express'
import productService from '../../services/product/index.services'
import { customError } from '../../helpers/error.helper'

const getProducts = async (req: Request, res: Response) => {
  try {
    const {page = 1, pageSize = 10, categoryId, subcategoryId, search} = req.query
    const {products, totalPages, count} = await productService.getProducts(
      Number(page), 
      Number(pageSize), 
      Number(categoryId), 
      Number(subcategoryId), 
      search as string
    )

    res.status(200).json({
      data: products,
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

export default getProducts
