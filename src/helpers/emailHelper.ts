import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const {EMAIL_USER} = process.env
const {EMAIL_PASS} = process.env
const {CORS} = process.env

if(!EMAIL_USER || !EMAIL_PASS || CORS) {
    throw new Error('Usuario o contraseña incorrecta')
}

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})

const sendPasswordRecoveryMail = async (email: string, token: string) => {

    const url = `${CORS}/user/reset/${token}`

    const mailOptions = ({
        from: EMAIL_USER,
        to: email,
        subject: 'Recuperacion de contraseña',
        text: `Para restablecer la contraseña, haz click en el siguiente enlace: ${url}`
    })

    try {
        await transporter.sendMail(mailOptions)
        console.log('Correo enviado exitosamente')
    } catch (error) {
        console.error('Error al enviar el correo:', error)
        throw new Error('Error al enviar el correo de recuperación')
    }
}

export default {sendPasswordRecoveryMail}