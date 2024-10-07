import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'
import Order from './order.models'
import Product from '../product/productModel.models'

class OrderProduct extends Model<
  InferAttributes<OrderProduct>,
  InferCreationAttributes<OrderProduct>
> {}

OrderProduct.init(
  {
    counter: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    tableName: 'OrderProduct',
    timestamps: false,
    sequelize
  }
)

Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' })
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' })

export default OrderProduct
