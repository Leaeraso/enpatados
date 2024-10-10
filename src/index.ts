import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route'
import { connection } from './db/connection'
import cookieParser from 'cookie-parser'

dotenv.config()

connection()

const { HTTP_PORT } = process.env
const app = express()

app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use(router)

app.listen(HTTP_PORT, () => {
  console.log(`server running on http://localhost:${HTTP_PORT}`)
})
