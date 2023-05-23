const mongoose = require("mongoose")


const UserTokenSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    token: {
        type: String,
        required: true
    },
    "expireAt": { type: Date, default: Date.now(), expires: 86400 * 30 }
}, { timestamps: true })

module.exports = mongoose.model("UserToken", UserTokenSchema);