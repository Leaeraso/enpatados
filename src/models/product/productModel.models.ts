import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../../db/connection'

interface Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  id: CreationOptional<number>
  name: string
  description: string
  price: number
  stock: number
}

const Product = sequelize.define<Product>(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 20
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    timestamps: true,
    tableName: 'Products'
  }
)

export default Product