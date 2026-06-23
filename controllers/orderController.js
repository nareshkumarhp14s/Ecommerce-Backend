import Order from '../models/Order.js';

export const createOrder =
async (req, res) => {

try {

const {
items,
totalAmount,
address,
} = req.body;

const order =
await Order.create({
user: req.user._id,
items,
totalAmount,
address,
});

res.status(201).json({
message:
'Order Placed Successfully',
order,
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

export const getMyOrders =
async (req, res) => {

try {

const orders =
await Order.find({
user: req.user._id,
}).sort({
createdAt: -1,
});

res.status(200).json(
orders
);

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

export const getAllOrders =
async (req, res) => {

try {

const orders =
await Order.find()
.populate(
'user',
'name email'
)
.sort({
createdAt: -1,
});

res.status(200).json(
orders
);

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

export const updateOrderStatus =
async (req, res) => {

try {

const order =
await Order.findById(
req.params.id
);

if (!order) {
return res.status(404).json({
message:
'Order not found',
});
}

order.status =
req.body.status;

await order.save();

res.status(200).json({
message:
'Status updated',
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};
