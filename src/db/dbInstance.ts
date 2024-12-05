import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const MYSQL_HOST: string = process.env.MYSQL_HOST!
const MYSQL_USER: string = process.env.MYSQL_USER!
const MYSQL_PASS: string = process.env.MYSQL_PASS!
const MYSQL_DB: string = process.env.MYSQL_DB!
const MYSQL_PORT: number = parseInt(process.env.MYSQL_PORT!)

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  port: MYSQL_PORT
})


export { sequelize }
