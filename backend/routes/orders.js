const { createOrder, getUserOrders, getallOrders, getOneOrder, changeOrderStatus, } = require("../controllers/ordersController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require('../middleware/authMiddleware');

const router = require("express").Router();



router.post('/createOrder', authMiddleware, createOrder)

router.get('/getUserOrders', authMiddleware,getUserOrders)

router.get('/getallOrders', authMiddleware,roleMiddleware,getallOrders)

router.get('/getOneOrder/:id', authMiddleware,roleMiddleware,getOneOrder)

router.put('/change-order-status', authMiddleware,roleMiddleware,changeOrderStatus)

module.exports = router



