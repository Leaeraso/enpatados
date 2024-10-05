import { sequelize } from './dbInstance'
import '../models/user/UserModel.models'
import '../models/product/ProductModel.models'

const createTables = async () => {
  // console.log(Product)

  await sequelize.sync({ force: false })
  console.log('The tables were just created!')
}

export default createTables
