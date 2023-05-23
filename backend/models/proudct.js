const mongoose = require("mongoose")


const proudctSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
    },
    colors: {
      type: Array,
      required: [true, "Please enter your product colors!"],
    },
    sizes: {
      type: Array,
      required: [true, "Please enter your product sizes!"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
      required:true
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your product price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    images: [String],
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        productId: {
          type: String,
        },
        createdAt:{
          type: Date,
          default: Date.now(),
        }
      },
    ],
    ratings: {
      type: Number,
    },
    sold_out: {
      type: Number,
      default: 0,
    }
  }, { timestamps: true })

  
const Product = mongoose.model("Proudct", proudctSchema);
module.exports = Product