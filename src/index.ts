import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route'
import { connection } from './db/connection'

dotenv.config()

const startApp = async () => {
  await connection() // Asegúrate de que la conexión está lista antes de continuar

  const { HTTP_PORT } = process.env
  const app = express()

  app.use(express.json())
  app.use(router)

  app.listen(HTTP_PORT, () => {
    console.log(`server running on http://localhost:${HTTP_PORT}`)
  })
}

startApp()
