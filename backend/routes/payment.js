const { createPayment } = require("../controllers/paymentController");
const router = require("express").Router();
const authMiddleware = require('../middleware/authMiddleware');


router.post('/create-payment', authMiddleware, createPayment)


router.post('/webhook', async (req, res) => {
    try {
        const { id, success, error_occured, error_message } = req.body;

        // Update your database with the payment status
        // ...

        console.log('wbehook active',{
            id, success, error_occured, error_message
        })

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;

module.exports = router;
