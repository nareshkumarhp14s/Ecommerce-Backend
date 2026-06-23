import PDFDocument from 'pdfkit';

import Order from '../models/Order.js';

export const downloadInvoice =
async (req,res) => {

try {

const order =
await Order.findById(
req.params.id
)
.populate(
'user',
'name email'
);

if (!order) {

return res.status(404).json({
message:
'Order not found',
});

}

const doc =
new PDFDocument();

res.setHeader(
'Content-Type',
'application/pdf'
);

res.setHeader(
'Content-Disposition',
`attachment; filename=invoice-${order._id}.pdf`
);

doc.pipe(res);

doc.fontSize(22)
.text(
'INVOICE',
{
align:'center',
}
);

doc.moveDown();

doc.fontSize(14)
.text(
`Invoice ID: ${order._id}`
);

doc.text(
`Customer: ${order.user.name}`
);

doc.text(
`Email: ${order.user.email}`
);

doc.text(
`Address: ${order.address}`
);

doc.text(
`Status: ${order.status}`
);

doc.text(
`Date: ${order.createdAt.toDateString()}`
);

doc.moveDown();

doc.fontSize(16)
.text(
'Products'
);

doc.moveDown();

order.items.forEach(
item => {

doc.fontSize(12)
.text(
`${item.title}
 | Qty: ${item.quantity}
 | ₹${item.price}`
);

}
);

doc.moveDown();

doc.fontSize(16)
.text(
`Total Amount: ₹${order.totalAmount}`
);

doc.end();

} catch(error) {

res.status(500).json({
message:
error.message,
});

}

};