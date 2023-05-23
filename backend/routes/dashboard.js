const { dashboardData, editSite, getSiteData } = require("../controllers/dashboardController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = require("express").Router();

// router.post('/register',register)

router.get('/getData', roleMiddleware, dashboardData)

router.post('/editSite', roleMiddleware, editSite)

router.post('/getSiteData', getSiteData)




// router.post('/register',register)

module.exports = router



