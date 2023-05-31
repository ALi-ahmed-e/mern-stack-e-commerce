const { createProduct, getProducts, deleteProduct, editProduct, getProduct, getCartProducts, toggleProductToCart, } = require("../controllers/productsController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require('../middleware/authMiddleware');

const router = require("express").Router();




router.put('/edit-product', roleMiddleware, editProduct)

router.post('/create-product', roleMiddleware, createProduct)



router.delete('/delete-product/:_id', roleMiddleware, deleteProduct)

router.post('/toggle-product-to-cart',authMiddleware, toggleProductToCart)

router.get('/get-products', getProducts)

router.get('/get-cart',authMiddleware, getCartProducts)


router.get('/get-product/:id', getProduct)



module.exports = router



