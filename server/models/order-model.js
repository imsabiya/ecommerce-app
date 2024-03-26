const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
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
            required: true,
        },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    { timeStamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
