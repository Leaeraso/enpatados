import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const { HTTP_PORT } = process.env

const app = express()

app.use(express.json())

app.listen(HTTP_PORT, () => {
  console.log(`server running on http://localhost:${HTTP_PORT}`)
})
