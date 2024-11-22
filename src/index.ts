import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route'
import { connection } from './db/connection'
import cookieParser from 'cookie-parser'
import setupAssociations from './models/assosiations'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'
import cors from "cors"

dotenv.config()

connection()

const { HTTP_PORT } = process.env
const app = express()

// Cors configuration
const whitelist = process.env.CORS!.split(" ")
const corsOptions = {
  origin(origin : any, callback : any) {    
    if (whitelist[0] === origin /* true */) {
      callback(null, true)
    } else {
      console.error("Not allowed by CORS", { origin })
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use(router)
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

setupAssociations()

app.listen(HTTP_PORT, () => {
  console.log(`server running on http://localhost:${HTTP_PORT}`)
})
