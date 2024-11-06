import { Request, Response } from "express"
import { customError } from "../../helpers/error.helper"
import userService from '../../services/user/index.services'

const passwordRecovery = async (req: Request, res: Response) => {
    try {

      const {email} = req.body
      console.log('email = ', email)
        
        console.log('llamando al servicio...')
        await userService.passwordRecovery(email) 
 
        res.status(200).json({message: `Se ha enviado un mail de recuperacion a ${email}`})
    } catch (error) {
        if (error instanceof customError) {
            console.error('Custom Error:', error)
            res.status(error.httpStatus).json({ error: error.message })
          } else {
            console.error('Internal Server Error:', error)
            res.status(500).json({ message: 'Error al recuperar la contraseña' })
          }
    }
}

export default passwordRecovery