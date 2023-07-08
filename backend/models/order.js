const mongoose = require("mongoose");




const orderProductSchema = new mongoose.Schema({
    name: String,
    color: String,
    size: String,
    description:String,
    quant:Number,
    id: {
        type: mongoose.Types.ObjectId,
        ref: 'Proudct'
    },
})

const orderSchema = new mongoose.Schema({
    shippingAddress: {
        type: Object,
        required: true,
    },
    products: {
        type: [orderProductSchema],
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
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