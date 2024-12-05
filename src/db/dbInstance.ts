import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const {MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT}= process.env


const sequelize = new Sequelize(MYSQL_DB!, MYSQL_USER!, MYSQL_PASS!, {
  host: MYSQL_HOST!,
  dialect: 'mysql',
  port: Number(MYSQL_PORT),
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})


export { sequelize }
