import { sequelize } from './dbInstance'
import '../models/user/UserModel.models'
import '../models/product/ProductModel.models'

console.log('sequelize de connection:', sequelize)

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.', sequelize)

    await sequelize.sync({ force: true })

    // await createTables()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connection }
