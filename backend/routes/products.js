const { createProduct, getProducts, deleteProduct, editProduct, getProduct, getCartProducts, toggleProductToCart, changeProdQuant, addProdToWhishList, getWhishListProducts, searchProducts, } = require("../controllers/productsController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require('../middleware/authMiddleware');

const router = require("express").Router();




router.put('/edit-product', roleMiddleware, editProduct)

router.post('/create-product', roleMiddleware, createProduct)



router.delete('/delete-product/:_id', roleMiddleware, deleteProduct)

router.post('/toggle-product-to-cart',authMiddleware, toggleProductToCart)

router.put('/change-quant',authMiddleware, changeProdQuant)

router.put('/add-product-whishlist',authMiddleware, addProdToWhishList)

router.get('/get-products', getProducts)

router.get('/get-cart',authMiddleware, getCartProducts)

router.get('/get-whishlist',authMiddleware, getWhishListProducts)

router.get('/get-product/:id', getProduct)

router.get('/search-products', searchProducts)



module.exports = router



