import User from '../models/user/userModel.models'
import Product from '../models/product/productModel.models'

const createTables = async () => {
  await Product.sync({ force: false })
  await User.sync({ force: false })
  console.log('The tables were just created!')
}

export default createTables
