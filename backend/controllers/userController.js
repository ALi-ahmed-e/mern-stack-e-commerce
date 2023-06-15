const User = require("../models/user")
const cloudinary = require("../utils/cloudinary");



const editUser = async (req, res) => {
    const { image, ...newData } = req.body

    try {

        const user = await User.findById(req.user._id)

        if (image && image != user.image) {

            const uploadedImage = await cloudinary.uploader.upload(image, { resource_type: 'image', folder: 'users_Images' })

            await User.findByIdAndUpdate(req.user._id, { ...newData, image: uploadedImage.secure_url })

            const updatedUser = await User.findById(req.user._id)


            return res.status(200).json(updatedUser);
        }

        
        await User.findByIdAndUpdate(req.user._id, newData)
        
        const updatedUser = await User.findById(req.user._id)
        

        return res.status(200).json(updatedUser);


    } catch (error) {
        return res.status(400).json(error.message);
    }
}




module.exports = {
    editUser,
}