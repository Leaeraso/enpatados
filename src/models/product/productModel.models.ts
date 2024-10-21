import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  id!: CreationOptional<number>
  name!: string
  description!: string
  price!: number
  stock!: number
  imageUrl!: string
  category!: string
}

Product.init(
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
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM('3/4', 'soquetes'),
      allowNull: false,
      defaultValue: 'soquetes'
    }
  },
  {
    timestamps: true,
    tableName: 'Products',
    sequelize
  }
)

export default Product
