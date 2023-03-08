const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true
    },
    orderCode: String,
    orderDate: String,
    requiredDate: String,
    shippedDate: String,
    orderStatus: {
      type: String,
      enum: ['NEW', 'PENDING', 'SHIPPED'],
      default: 'NEW'
    },
  })
);

module.exports = Order;
