import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import createTables from './initTables'

dotenv.config()

const MYSQL_HOST: string = process.env.MYSQL_HOST!
const MYSQL_USER: string = process.env.MYSQL_USER!
const MYSQL_PASS: string = process.env.MYSQL_PASS!
const MYSQL_DB: string = process.env.MYSQL_DB!

const sequelize: Sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  logging: console.log
})

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await createTables()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { sequelize, connection }
