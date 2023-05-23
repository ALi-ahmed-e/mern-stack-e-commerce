const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
   
    try {
        const token = req.cookies.access_token;
        if (!token) {
    
            return res.status(401).json({ message: "No token, authorization denied" })
        }

        const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY)
        const user = await User.findById(tokenDetails.user._id)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: "authorization denied invalid token" })
    }

}

module.exports = authMiddleware