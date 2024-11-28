import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    id!: CreationOptional<number>
    url!: string
    productId!: number
}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        tableName: 'Images',
        sequelize
    }
)

export default Image