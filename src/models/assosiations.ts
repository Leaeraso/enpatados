import Order from './order/order.models'
import Product from './product/product.models'
import OrderProduct from './order/orderProduct.models'
import User from './user/userModel.models'
import Category from './category/category.models'
import Image from './image/image.models'
import Subcategory from './subcategory/subcategory.models'

Order.belongsToMany(Product, { through: 'OrderProduct', foreignKey: 'orderId', otherKey: 'productId',as: 'products' })
Product.belongsToMany(Order, { through: 'OrderProduct', foreignKey: 'productId', otherKey:'orderId', as: 'orders' })

OrderProduct.belongsTo(Order, { foreignKey: 'orderId' })
OrderProduct.belongsTo(Product, { foreignKey: 'productId' })

User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

Category.hasMany(Product, {foreignKey: 'categoryId', as:'products'})
Product.belongsTo(Category, {foreignKey: 'categoryId', as:'category'})

Category.hasMany(Subcategory, {foreignKey:'categoryId', as: 'subcategories'})
Subcategory.belongsTo(Category, {foreignKey: 'categoryId', as: 'category'})

Subcategory.hasMany(Product, {foreignKey: 'subcategoryId', as:'products'})
Product.belongsTo(Subcategory, {foreignKey: 'subcategoryId', as:'subcategory'})

Product.hasMany(Image, {foreignKey: 'productId', as:'images'})
Image.belongsTo(Product, {foreignKey: 'productId', as:'product'})

export default function setupAssociations() {
}
