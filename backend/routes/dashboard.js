const { dashboardData, editSite, getSiteData, getAdmins, changeAdmins } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = require("express").Router();

// router.post('/register',register)

router.get('/getData', authMiddleware, roleMiddleware, dashboardData)

router.get('/getAdmins', authMiddleware, roleMiddleware, getAdmins)

router.post('/editSite', authMiddleware, roleMiddleware, editSite)

router.put('/changeAdmins', authMiddleware, roleMiddleware, changeAdmins)

router.post('/getSiteData/:uid', getSiteData)




// router.post('/register',register)

module.exports = router



