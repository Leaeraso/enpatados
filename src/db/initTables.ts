import { sequelize } from '../db/connection'
import '../models/user/userModel.models'
import '../models/product/productModel.models'

const createTables = async () => {
  await sequelize.sync({ force: false })
  console.log('The tables were just created!')
}

export default createTables
