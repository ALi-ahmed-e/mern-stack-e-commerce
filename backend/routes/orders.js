const { createOrder, getUserOrders, } = require("../controllers/ordersController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require('../middleware/authMiddleware');

const router = require("express").Router();



router.post('/createOrder', authMiddleware, createOrder)

router.get('/getUserOrders', authMiddleware,getUserOrders)



module.exports = router



