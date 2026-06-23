import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import {
createOrder,
getMyOrders,
getAllOrders,
updateOrderStatus,
} from '../controllers/orderController.js';

const router =
express.Router();

router.post(
'/',
authMiddleware,
createOrder
);

router.get(
'/my-orders',
authMiddleware,
getMyOrders
);

router.get(
'/admin',
authMiddleware,
adminMiddleware,
getAllOrders
);

router.put(
'/:id/status',
authMiddleware,
adminMiddleware,
updateOrderStatus
);

export default router;
