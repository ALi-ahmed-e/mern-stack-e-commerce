const mongoose = require("mongoose")


const dashBoardDataSchema = new mongoose.Schema({

    admins: {
        type:[mongoose.Types.ObjectId],
        required: true,
        ref:'User'
    },
    deliverycoast:{
        type:Number,
        required: true
    },
    banner:{
        type:String,

    }
}, { timestamps: true })
const DashBoardData =mongoose.model("DashBoardData", dashBoardDataSchema);
module.exports = DashBoardData