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
    title!: string
    subtitle!: string
    icon!: string
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        subtitle: {
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
