const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const generateTokens = require('../utils/generateTokens');
const verifyRefreshToken = require('../utils/verifyRefrshTokens');
const UserToken = require('../models/UserToken');
const verficationToken = require('../models/verficationToken');
const crypto = require('crypto');
const sendEMail = require('../utils/nodeMailer');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })

const googleAutherrmiddle = passport.authenticate('google')


//sign up
const register = async (req, res) => {
    const { name, email } = req.body
    try {


        if (!name || !email || !req.body.password) {
            return res.status(400).json({ message: 'all fields required' })
        }
        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            image: `https://ui-avatars.com/api/?background=random&name=${name}&format=png`,
            provider: 'local'
        })


        const vtoken = await verficationToken.create({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        const link = `${process.env.CLIENT_URL}/users/${vtoken.userId}/verfiy/${vtoken.token}`


        const htmlTemplate = `
  <div>
    <p>Click on the link below to verfiy your account</p>
    <a href="${link}">Verfiy</a>
    <p>link expires after 2 hours</p>

  </div>
  `

        await sendEMail(newUser.email, "Verfiy your email", htmlTemplate)





        res.status(201).json('we sent link to your  email address')


    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}


const verfiyEmail = async (req, res) => {
    const vtoken = await verficationToken.findOne({ token: req.params.token })
    const user = await User.findById(req.params.userId)



    if (!user || !vtoken) return res.status(400).json('invalid link')

    user.verified = true
    await user.save()

    await verficationToken.findByIdAndDelete(vtoken._id)

    const { accessToken, refreshToken } = await generateTokens(user._doc)

    const { password, ...clientUser } = user._doc

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })

    res.status(201).json(clientUser)


}





//login
const login = async (req, res) => {
    const { email } = req.body

    try {

        if (!email || !req.body.password) {
            return res.status(400).json({ message: 'all fields required' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({ message: 'invalid email or password' })
        }
        if (user.verified) {


            const validPassword = await bcrypt.compare(req.body.password, user.password)

            if (!validPassword) {
                return res.status(401).json({ message: 'invalid email or password' })
            }

            const { accessToken, refreshToken } = await generateTokens(user)

            const { password, ...clientUser } = user._doc

            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })

            res.status(200).json(clientUser)
        } else {
            const vtoken = await verficationToken.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            })

            const link = `${process.env.CLIENT_URL}/users/${vtoken.userId}/verfiy/${vtoken.token}`


            const htmlTemplate = `
            <div>
              <p>Click on the link below to verfiy your account</p>
              <a href="${link}">Verfiy</a>
              <p>link expires after 2 hours</p>
          
            </div>
            `

            await sendEMail(user.email, "Verfiy your email", htmlTemplate)





            res.status(400).json({message:'your email not verfiyed we sent link to your email address'})

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })

    }



}


//login & register with google
const mainGoogleAuth = async (req, res) => {
    const guserData = req.user._json

    if (!req.user) return res.status(400).send('user data nedded')


    try {

        const user = await User.find({ email: guserData.email })


        if (user != '') {

            const { accessToken, refreshToken } = await generateTokens(user[0])



            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })

            return process.env.STATE == 'dev'? res.redirect('http://localhost:3000/'):res.redirect(process.env.CLIENT_URL)
        }





        const newUser = await User.create({
            name: guserData.name,
            image: guserData.picture,
            email: guserData.email,
            verified: guserData.email_verified,
            password: 'google',
            provider: 'google'
        })


        const { accessToken, refreshToken } = await generateTokens(newUser)



        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        return res.redirect(process.env.CLIENT_URL)




    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.message })
    }

}

//check logged in
const checkLoggedIn = async (req, res) => {
    const user = await User.findById(req.user._id)


    if (user) {

        const { password, ...clientUser } = user._doc

        // res.cookie("user",clientUser)


        return res.status(200).json(clientUser)
    }

    return res.status(401).json('not logged in')

}

//log user out
const signOut = async (req, res) => {
    const token = req.cookies.refresh_token
    try {
        if (!token) return res.status(400).send("token is required")

        const userToken = await UserToken.findOne({ token });

        if (!userToken) return res.status(200).json({ error: false, message: "Logged Out Sucessfully" });

        await UserToken.findByIdAndRemove(userToken._id)

        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        res.clearCookie("connect.sid")

        res.status(200).json({ error: false, message: "Logged Out Sucessfully" });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }

}


//delete user account
const deleteUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.user.email })

        if (!user) {
            return res.status(400).send({ message: 'error occurd' })
        }


        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: 'invalid password' })
        }


        res.clearCookie("access_token")
        res.clearCookie("refresh_token")

        res.status(200).json({
            message: 'account deleted successfully'
        })


    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}

//get new access token using refresh token
const refreshToken = async (req, res) => {

    if (!req.cookies.refresh_token) return res.status(400).send('you are not logged in')



    try {
        const { tokenDetails } = await verifyRefreshToken(req.cookies.refresh_token)


        const accessToken = jwt.sign({ user: tokenDetails.user }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "1d" })


        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.status(200).send({ message: 'successfuly set new access token' })
    } catch (error) {
        res.status(400).send(error.message)
    }

}


module.exports = {
    googleAuth,
    mainGoogleAuth,
    googleAutherrmiddle,
    checkLoggedIn,
    deleteUser,
    signOut,
    refreshToken,
    register,
    login,
    verfiyEmail,


}