const Product = require("../models/proudct");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require('uuid');




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
        res.status(400).json(error.message)
    }
}


const editProduct = async (req, res) => {
    const { images, name, description, colors, sizes, tags, originalPrice, discountPrice, stock, category, id, avilable } = req.body;

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
            avilable,
        }

        await Product.findByIdAndUpdate(id, productGf)
        const newProduct = await Product.findById(id)

        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}


const deleteProduct = async (req, res) => {
    const { _id } = req.params;

    try {

        const Dproduct = await Product.findByIdAndDelete(_id)

        res.status(200).json(Dproduct)

    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

const getProducts = async (req, res) => {
    const { page, limit } = req.query

    const skip = (page - 1) * limit
    try {
        const products = await Product.find().skip(skip).limit(limit)


        const number_of_products = await Product.find().countDocuments()


        res.status(200).json({ products, number_of_products, page })
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id)



        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

const toggleProductToCart = async (req, res) => {
    const { productID, quant, color, size } = req.body
    try {


        const user = await User.findById(req.user._id)

        const isProductExists = user?.cart?.some(cartItem => cartItem.product.equals(productID));

        if (isProductExists) {


            await User.findByIdAndUpdate(req.user._id, { $pull: { cart: { product: productID } } })

            return res.status(200).json({ state: 'remove', productID })

        } else {
            const _id = uuidv4().replace(/-/g, '').slice(0, 25)

            const cartProduct = {
                product: productID,
                quant,
                color,
                size,
                _id
            }

            await User.findByIdAndUpdate(req.user._id, {
                $push: { cart: cartProduct }
            })


            return res.status(200).json({ state: 'add', product: cartProduct })
        }


    } catch (error) {
        return res.status(400).json(error.message)
    }


}


const getCartProducts = async (req, res) => {
    try {
        const { cart } = await User.findById(req.user._id, 'cart -_id').populate('cart.product')
        let subTotal = 0
        let numberOfAvilableProductsInCart = 0

        cart.map(({ product, quant }) => {
            if (product.avilable) {
                subTotal += (parseInt(product.discountPrice) * parseInt(quant))
                numberOfAvilableProductsInCart++
            }
        })


        res.status(200).json({ cart, subTotal, numberOfAvilableProductsInCart })

    } catch (error) {
        res.status(400).json(error.message)
    }
}


const changeProdQuant = async (req, res) => {
    const { cartProductId, quant } = req.body;

    try {
        const user = await User.findById(req.user._id);

        // if (!user) {
        //     return res.status(404).send({ message: 'User not found' });
        // }

        const cartProduct = user.cart.id(cartProductId);

        if (!cartProduct) {
            return res.status(404).send({ message: 'Cart product not found' });
        }

        if (quant <= 1) {
            cartProduct.quant = 1;
        } else {
            cartProduct.quant = quant
        }



        await user.save();

        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }


}


const addProdToWhishList = async (req, res) => {
    const { productID } = req.body;

    try {
        const { whishlist } = await User.findById(req.user._id, 'whishlist -_id')

        if (whishlist.includes(productID)) {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { whishlist: productID }
            });
            return res.status(200).json('removed succesfuly');

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: { whishlist: productID }
        });
        return res.status(200).json('added succesfuly');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }


}

const getWhishListProducts = async (req, res) => {
    try {
        const { whishlist } = await User.findById(req.user._id, 'whishlist -_id').populate('whishlist')

        res.status(200).json(whishlist)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const searchProducts = async (req, res) => {
    const { page, limit, query } = req.query
    const skip = (page - 1) * limit
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: `.*${query}.*`, $options: 'i' } },
                { description: { $regex: `.*${query}.*`, $options: 'i' } }
            ]
        }).skip(skip).limit(parseInt(limit))

        const number_of_products = await Product.find({
            $or: [
                { name: { $regex: `.*${query}.*`, $options: 'i' } },
                { description: { $regex: `.*${query}.*`, $options: 'i' } }
            ]
        }).countDocuments()


        res.status(200).json({ products, number_of_products, page })

    } catch (error) {
        res.status(400).json(error.message)
    }
}


module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    editProduct,
    getProduct,
    toggleProductToCart,
    getCartProducts,
    changeProdQuant,
    addProdToWhishList,
    getWhishListProducts,
    searchProducts,
}