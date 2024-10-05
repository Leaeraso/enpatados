import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// import createTables from './initTables'

dotenv.config()

const MYSQL_HOST: string = process.env.MYSQL_HOST!
const MYSQL_USER: string = process.env.MYSQL_USER!
const MYSQL_PASS: string = process.env.MYSQL_PASS!
const MYSQL_DB: string = process.env.MYSQL_DB!

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  logging: console.log
})

console.log('sequelize declaration:', sequelize)

export { sequelize }
