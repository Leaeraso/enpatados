import { Request, Response } from "express"
import { customError } from "../../helpers/error.helper"
import userService from '../../services/user/index.services'

const passwordRecovery = async (req: Request, res: Response) => {
    try {

      const {email} = req.body
        
      await userService.passwordRecovery(email) 
 
      res.status(200).json({message: `Se ha enviado un mail de recuperacion a ${email}`})
    } catch (error) {
        if (error instanceof customError) {
          res.status(error.httpStatus).json({ error: error.message })
        } else {
          res.status(500).json({ message: 'internal server error' })
        }
    }
}

export default passwordRecovery