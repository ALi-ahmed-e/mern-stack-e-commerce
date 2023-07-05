const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingAddress: {
        type: Object,
        required: true,
    },
    products: {
        type: [Object],
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Processing",
    },
    paymentInfo: {
        status: {
            type: String,
            default: 'pending'
        },
        type: {
            type: String,
            default: 'on door'
        },
    },
    paidAt: {
        type: String,
        default: 'pending',
        // default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);
module.exports = Order