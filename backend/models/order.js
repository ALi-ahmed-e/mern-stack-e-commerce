const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingAddress:{
        type: Object,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: "Processing",
    },
    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
},{timestamps:true});


const Order =  mongoose.model("Order", orderSchema);
module.exports = Order