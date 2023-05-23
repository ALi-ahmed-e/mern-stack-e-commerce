const { mainGoogleAuth, googleAuth, googleAutherrmiddle, checkLoggedIn, refreshToken, signOut, register, login, verfiyEmail } = require("../controllers/authController");
const authMiddleware  = require('../middleware/authMiddleware');
const router = require("express").Router();

router.post('/register',register)

router.get('/verfiyEmail/:userId/:token',verfiyEmail)

router.post('/login',login)


router.get('/google', googleAuth)

router.get('/google/callback', googleAutherrmiddle, mainGoogleAuth);

router.post('/checkLoggedIn',authMiddleware, checkLoggedIn)

router.post("/refreshToken", refreshToken)

router.post("/logout",signOut)


// router.get('/err', googleAutherr)


module.exports = router

