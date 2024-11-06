import { Request, Response } from 'express'

const authSession = async (req: Request, res: Response) => {
    try {
        res.status(200).json({user: req.user})
    } catch (error) {
        res.status(500).json({message: 'Error al veriricar la sesion'})
    }
}

export default authSession