import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: CreationOptional<number>
  googleId!: string | null
  name!: string
  surname!: string
  password!: string | null
  email!: string
  dob!: Date | null
  role!: CreationOptional<string>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 20
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 20
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 8,
        max: 30
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      },
      defaultValue: '2000-01-01'
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer', 'god'),
      allowNull: false,
      defaultValue: 'customer'
    }
  },
  {
    tableName: 'Users',
    timestamps: true,
    sequelize
  }
)

export default User
