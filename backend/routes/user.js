const { editUser } = require('../controllers/userController');
const authMiddleware  = require('../middleware/authMiddleware');
const router = require("express").Router();

router.post('/edit-account',authMiddleware,editUser)

// router.get('/verfiyEmail/:userId/:token',verfiyEmail)


module.exports = router

