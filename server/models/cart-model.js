const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  bill: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
