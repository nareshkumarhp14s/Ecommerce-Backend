import dotenv from 'dotenv';
dotenv.config();

import express from 'express';


import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';


console.log(
'CLOUD_NAME:',
process.env.CLOUD_NAME
);

console.log(
'CLOUD_API_KEY:',
process.env.CLOUD_API_KEY
);

console.log(
'CLOUD_API_SECRET:',
process.env.CLOUD_API_SECRET
? 'FOUND'
: 'MISSING'
);

const app = express();

app.use(express.json());

app.use(
express.urlencoded({
extended: true,
})
);

connectDB();

app.use(
'/api/auth',
authRoutes
);

app.use(
'/api/products',
productRoutes
);

app.use(
'/api/orders',
orderRoutes
);

app.use(
'/api/analytics',
analyticsRoutes
);

app.use(
'/api/upload',
uploadRoutes
);


app.use(
'/api/payment',
paymentRoutes
);
app.use(
'/api/invoice',
invoiceRoutes
);

app.get(
'/',
(req, res) => {
res.send(
'Auth API Running'
);
}
);

const PORT =
process.env.PORT || 5000;

app.listen(
PORT,
() => {
console.log(
`Server running on port ${PORT}`
);
}
);