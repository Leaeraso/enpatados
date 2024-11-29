import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    id!: CreationOptional<number>
    name!: string
    description!: string
    icon!: string
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: 'Categories',
        sequelize
    }
)

export default Category
