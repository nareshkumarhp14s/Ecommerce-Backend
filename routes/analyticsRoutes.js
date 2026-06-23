import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import {
getAnalytics,
} from '../controllers/analyticsController.js';

const router =
express.Router();

router.get(
'/',
authMiddleware,
adminMiddleware,
getAnalytics
);

export default router;