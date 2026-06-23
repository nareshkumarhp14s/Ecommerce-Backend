import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getAnalytics =
async (req,res) => {

try {

const totalUsers =
await User.countDocuments();

const totalProducts =
await Product.countDocuments();

const totalOrders =
await Order.countDocuments();

const orders =
await Order.find();

const revenue =
orders.reduce(
(sum,order) =>
sum + order.totalAmount,
0
);

res.status(200).json({
totalUsers,
totalProducts,
totalOrders,
revenue,
});

} catch(error) {

res.status(500).json({
message:error.message,
});

}

};