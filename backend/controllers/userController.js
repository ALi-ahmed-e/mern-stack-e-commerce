const User = require("../models/user")




const editUser = async (req, res) => {
    const newData = req.body
    try {

        await User.findByIdAndUpdate(req.user._id,newData)

        const updatedUser = await User.findById(req.user._id)


        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports = {
    editUser,
}