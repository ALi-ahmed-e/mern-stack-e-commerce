const { createPayment, processedcallback } = require("../controllers/paymentController");
const router = require("express").Router();
const authMiddleware = require('../middleware/authMiddleware');


router.post('/create-payment', authMiddleware, createPayment)


router.post('/processedcallback', processedcallback)



module.exports = router;
