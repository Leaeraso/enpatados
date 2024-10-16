import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'
import User from '../user/userModel.models'

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  orderNumber!: CreationOptional<number>
  date!: Date
  total!: number
  status!: string
  userId!: number
  discount!: number
}

Order.init(
  {
    orderNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('creado', 'pendiente', 'pagado', 'cancelado'),
      allowNull: false,
      defaultValue: 'creado'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    tableName: 'Orders',
    timestamps: true,
    sequelize
  }
)

User.hasMany(Order, { foreignKey: 'userId', sourceKey: 'id' })
Order.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })

export default Order
