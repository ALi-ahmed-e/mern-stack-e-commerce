const { createProduct, getProducts, deleteProduct, editProduct, getProduct, } = require("../controllers/productsController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = require("express").Router();




router.put('/edit-product', roleMiddleware, editProduct)

router.post('/create-product', roleMiddleware, createProduct)

router.delete('/delete-product/:_id', roleMiddleware, deleteProduct)

router.get('/get-products', getProducts)


router.get('/get-product/:id', getProduct)



module.exports = router



