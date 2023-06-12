const { dashboardData, editSite, getSiteData } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = require("express").Router();

// router.post('/register',register)

router.get('/getData', authMiddleware, dashboardData)

router.post('/editSite', authMiddleware, roleMiddleware, editSite)

router.post('/getSiteData/:uid', getSiteData)




// router.post('/register',register)

module.exports = router



