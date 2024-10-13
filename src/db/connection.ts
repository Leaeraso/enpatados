import { sequelize } from './dbInstance'
import '../models/user/userModel.models'
import '../models/product/productModel.models'
import '../models/order/order.models'
import '../models/order/orderProduct.models'

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync({ force: true })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connection }
