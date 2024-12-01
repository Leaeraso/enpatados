import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route'
import { connection } from './db/connection'
import cookieParser from 'cookie-parser'
import setupAssociations from './models/assosiations'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'
import cors from "cors"
import passport from 'passport'
import './docs/passport'
import session from 'express-session'

dotenv.config()

connection()

const { HTTP_PORT } = process.env
const { SECRET_KEY } = process.env

if(!SECRET_KEY){throw new Error('SECRET_KEY no esta declarado en las variables de entorno')}

const app = express()

// Cors configuration
const whitelist = process.env.CORS!.split(" ")
const corsOptions = {
  origin(origin : any, callback : any) {    
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      console.error("Not allowed by CORS", { origin })
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}))
app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use(passport.initialize())
app.use(passport.session())

app.use(router)
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

setupAssociations()

app.listen(HTTP_PORT, () => {
  console.log(`server running on http://localhost:${HTTP_PORT}`)
})
