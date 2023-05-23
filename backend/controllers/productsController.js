const Product = require("../models/proudct")
// const User = require("../models/user")
// const Order = require("../models/order");
const cloudinary = require("../utils/cloudinary");





const createProduct = async (req, res) => {
    const { images, name, description, colors, sizes, tags, originalPrice, discountPrice, stock, category } = req.body;

    let imagesLinks = []

    try {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const uploadedImage = await cloudinary.uploader.upload(image, { resource_type: 'image', folder: 'products_Images' })
            imagesLinks.push(uploadedImage.secure_url);
        }



        const productGf = {
            name,
            description,
            category,
            colors,
            sizes,
            tags,
            originalPrice,
            discountPrice,
            stock,
            images: imagesLinks,
        }

        const newProduct = await Product.create(productGf)

        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.message)
    }
}


const editProduct = async (req, res) => {
    const { images, name, description, colors, sizes, tags, originalPrice, discountPrice, stock, category,id } = req.body;

    let imagesLinks = []

    try {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const uploadedImage = await cloudinary.uploader.upload(image, { resource_type: 'image', folder: 'products_Images' })
            imagesLinks.push(uploadedImage.secure_url);
        }



        const productGf = {
            name,
            description,
            category,
            colors,
            sizes,
            tags,
            originalPrice,
            discountPrice,
            stock,
            images: imagesLinks,
        }

        await Product.findByIdAndUpdate(id,productGf)
        const newProduct = await Product.findById(id)

        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.message)
    }
}


const deleteProduct = async (req, res) => {
    const { _id } = req.params;

    try {

        const Dproduct = await Product.findByIdAndDelete(_id)

        res.status(200).json(Dproduct)

    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.message)
    }
}

const getProducts = async (req, res) => {
    const { page, limit } = req.query

    const skip = (page - 1) * limit
    try {
        const products = await Product.find().skip(skip).limit(limit)


        const number_of_products = await Product.find().countDocuments()


        res.status(200).json({products,number_of_products,page})
    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.message)
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params

    try {
        const product = await Product.findById(id)



        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.message)
    }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    editProduct,
    getProduct,
}