const mongoose = require("mongoose")


const verficationTokenSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    token: {
        type: String,
        required: true
    },
    "expireAt": { type: Date, default: Date.now(), expires: 7200 }
}, { timestamps: true })

const verficationToken =  mongoose.model("verficationToken", verficationTokenSchema);

module.exports = verficationToken