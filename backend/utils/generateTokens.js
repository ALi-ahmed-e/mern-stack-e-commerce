const jwt = require('jsonwebtoken')
const UserToken = require('../models/UserToken.js')

const generateTokens = async (user) => {

    try {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '14m' })

        const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '30d' })

        const userToken = await UserToken.findOne({ userId: user._id })
        
        // if (userToken) await UserToken.findByIdAndDelete(userToken._id.toString())


        await new UserToken({ userId: user._id, token: refreshToken }).save()

        return Promise.resolve({ accessToken, refreshToken })
    } catch (error) {
        return Promise.reject(error)
    }


}

module.exports = generateTokens