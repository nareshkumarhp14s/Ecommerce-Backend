import razorpay from '../config/razorpay.js';
import crypto from 'crypto';



export const createPayment = async (req,res) => {
    try {

        const {amount,} = req.body;
        const order = await razorpay.orders.create({

        amount:amount * 100,
        currency:'INR',
        receipt:`receipt_${Date.now()}`,
    });

    res.status(200).json(order);

    } catch(error) {
        res.status(500).json({message:error.message,});
    }
};
export const verifyPayment =
async (req,res) => {

try {

const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
} = req.body;

const body =
razorpay_order_id +
'|' +
razorpay_payment_id;

const expectedSignature =
crypto
.createHmac(
'sha256',
process.env.RAZORPAY_KEY_SECRET
)
.update(body.toString())
.digest('hex');

const isAuthentic =
expectedSignature ===
razorpay_signature;

if (!isAuthentic) {

return res.status(400).json({
message:
'Invalid Payment',
});

}

res.status(200).json({
success:true,
message:
'Payment Verified',
});

} catch(error) {

res.status(500).json({
message:error.message,
});

}

};