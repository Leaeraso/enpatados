import { Resend } from "resend";
import dotenv from 'dotenv'

dotenv.config()

const RESEND_API_KEY = process.env.RESEND_API_KEY

if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY no está definido en las variables de entorno.')
    throw new Error('RESEND_API_KEY no está definido en las variables de entorno.')
}

const resend = new Resend(RESEND_API_KEY);

const sendConfirmationEmail = async (email: string, name: string, _token: string) => {
    try {
        const confirmationUrl = 'https://www.youtube.com'

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Confirmacion de registro',
            html: `
                <h1>Hola, ${name}</h1>
                <p>Gracias por registrarte. Por favor, confirma tu registro haciendo click en el siguiente enlace:</p>
                <a href="${confirmationUrl}">Confirmar Registro</a>
            `
        })
        console.log(`Correo de confirmación enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
        throw new Error('No se pudo enviar el correo de confirmación');
    }
}

export default {sendConfirmationEmail}


