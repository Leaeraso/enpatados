import { DataTypes } from 'sequelize'
import { sequelize } from '../../db/connection'

const User = sequelize.define(
  'User',
  {
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
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  }
)

export default User
