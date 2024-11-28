import Order from './order/order.models'
import Product from './product/product.models'
import OrderProduct from './order/orderProduct.models'
import User from './user/userModel.models'
import Category from './category/category.models'
import Image from './image/image.models'
import Subcategory from './subcategory/subcategory.models'

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' })

OrderProduct.belongsTo(Order, { foreignKey: 'orderId' })
OrderProduct.belongsTo(Product, { foreignKey: 'productId' })

User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

Category.hasMany(Product, {foreignKey: 'categoryId'})
Product.belongsTo(Category, {foreignKey: 'categoryId'})

Category.hasMany(Subcategory, {foreignKey:'categoryId'})
Subcategory.belongsTo(Category, {foreignKey: 'categoryId'})

Subcategory.hasMany(Product, {foreignKey: 'subcategoryId'})
Product.belongsTo(Subcategory, {foreignKey: 'subcategoryId'})

Product.hasMany(Image, {foreignKey: 'productId'})
Image.belongsTo(Product, {foreignKey: 'productId'})

export default function setupAssociations() {
}
