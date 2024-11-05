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
  name!: string
  surname!: string
  password!: string
  email!: string
  dob!: Date
  role!: CreationOptional<string>
  isValidated!: CreationOptional<boolean>
}

User.init(
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
      allowNull: false,
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
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer', 'god'),
      allowNull: false,
      defaultValue: 'customer'
    },
    isValidated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'Users',
    timestamps: true,
    sequelize
  }
)

export default User
