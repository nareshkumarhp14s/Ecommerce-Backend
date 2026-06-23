import mongoose from 'mongoose';

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'User',
        required: true,
      },

      items: [
        {
          product: {
            type:
              mongoose.Schema
                .Types.ObjectId,
            ref: 'Product',
          },

          title: String,

          price: Number,

          quantity: Number,
        },
      ],
      address: {
  type: String,
  required: true,
},

      totalAmount: {
        type: Number,
        required: true,
      },

      status: {
type: String,
enum: [
'Pending',
'Processing',
'Shipped',
'Delivered',
],
default: 'Pending',
},
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  'Order',
  orderSchema
);