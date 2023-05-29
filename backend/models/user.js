const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required:true,
  },
  phoneNumber: {
    type: Number,
    required:true,
  },
  addresses: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    zipCode: {
      type: Number,
    }
  }
  ,
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
  },
  provider:{
    type: String,
  },
  cart:{
    type: Array,
    default: [],
    ref:'Product',
  },gender:{
    type: String,
    default: 'Male',
  }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
module.exports = User