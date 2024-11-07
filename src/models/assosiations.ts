import Order from './order/order.models';
import Product from './product/productModel.models';
import OrderProduct from './order/orderProduct.models';
import User from './user/userModel.models';

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export default function setupAssociations() {
}
