////File for schema of address model

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressId: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Address", addressSchema);
