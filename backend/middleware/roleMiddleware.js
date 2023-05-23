const jwt = require('jsonwebtoken');
const User = require('../models/user');

const roleMiddleware = async (req, res, next) => {
   
    try {
        const token = req.cookies.access_token;
        if (!token) {
    
            return res.status(401).json({ message: "No token, authorization denied" })
        }

        const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY)

        const user = await User.findById(tokenDetails.user._id)

       if(user.role == 'user')return res.status(401).json({ message: "you are not admin. you have no access to this" })


        req.user = user
         
        next()
    } catch (error) {
        res.status(401).json({ message: "authorization denied invalid token" })
    }

}

module.exports = roleMiddleware