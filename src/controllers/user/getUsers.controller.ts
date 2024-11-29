import { Request, Response } from 'express'
import { customError } from '../../helpers/error.helper'
import userService from '../../services/user/index.services'

const getUsers = async (req: Request, res: Response) => {
    try {
        const {page = 1, pageSize = 10} = req.query

        const {users, totalPages, count} = await userService.getUsers(Number(page), Number(pageSize))

        res.status(200).json({
            data: users,
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

export default getUsers