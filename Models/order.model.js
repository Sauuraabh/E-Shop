////File for schema of order model

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  addressId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
