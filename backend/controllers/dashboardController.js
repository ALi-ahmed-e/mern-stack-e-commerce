const User = require("../models/user")
const Order = require("../models/order");
const DashBoardData = require("../models/dashboardData");
const cloudinary = require("../utils/cloudinary");


const dashboardData = async (req, res) => {

    try {



        const end30Date = new Date();
        const start30Date = new Date(end30Date.getTime() - 29 * 24 * 60 * 60 * 1000);




        const OrdersLast30Days = []
        const UsersLast30Days = []

        // Loop over each day of the last month

        let dates = []


        for (let date = new Date(start30Date); date <= end30Date; date.setDate(date.getDate() + 1)) {

            const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);


            dates.push({ startOfDay, endOfDay, date: date.toISOString().slice(0, 10) })

        }



        dates.forEach(async ({ startOfDay, endOfDay, date }) => {
            const count2 = await Order.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });


            OrdersLast30Days.push({
                date: date,
                number: count2
            });
        });

        dates.forEach(async ({ startOfDay, endOfDay, date }) => {

            const count = await User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });


            UsersLast30Days.push({
                date,
                number: count
            });
        });
        // console.log('s1')

        const [numberOfUsers, numberOfOrders, usersWithGoogle] = await Promise.all([
            User.estimatedDocumentCount(),
            Order.estimatedDocumentCount(),
            User.find({ provider: 'google' }).countDocuments()
        ]);


        const data = {
            number_Of_Users: numberOfUsers,



            numberOfUsersLast30Days: UsersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)),

            numberOfOrdersLast30Days: OrdersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)),

            numberOfUsersLast7Days: UsersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7),

            numberOfOrdersLast7Days: OrdersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7),

            numberOfOrders: numberOfOrders,

            usersWithGoogle,

            usersWithemaiandPassword: numberOfUsers - usersWithGoogle,
        }





        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}




//waterfall
// const dashboardData = async (req, res) => {

//     try {




//         const end30Date = new Date();
//         const start30Date = new Date(end30Date.getTime() - 29 * 24 * 60 * 60 * 1000);




//         const OrdersLast30Days = []
//         const UsersLast30Days = []



//         for (let date = new Date(start30Date); date <= end30Date; date.setDate(date.getDate() + 1)) {

//             const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//             const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);



//             const count = await User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });

//             UsersLast30Days.push({
//                 date:date.toISOString().slice(0, 10),
//                 number: count
//             });
//             const count2 = await Order.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });


//             OrdersLast30Days.push({
//                 date:date.toISOString().slice(0, 10),
//                 number: count2
//             });


//         }



//         // console.log('s1')


//         const numberOfUsers = await User.estimatedDocumentCount()
//         // console.log('s2')
//         const numberOfOrders = await Order.estimatedDocumentCount();
//         // console.log('s3')
//         const usersWithGoogle = await User.find({ provider: 'google' }).countDocuments()
//         // console.log('s4')


//         const data = {
//             number_Of_Users: numberOfUsers,



//             numberOfUsersLast30Days: UsersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)),

//             numberOfOrdersLast30Days: OrdersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)),

//             numberOfUsersLast7Days: UsersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7),

//             numberOfOrdersLast7Days: OrdersLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7),

//             numberOfOrders: numberOfOrders,

//             usersWithGoogle,

//             usersWithemaiandPassword: numberOfUsers - usersWithGoogle,
//         }





//         return res.status(200).json(data)
//     } catch (error) {
//         console.log(error.message)
//         return res.status(400).json(error.message)
//     }
// }


const editSite = async (req, res) => {
    const { banner, deliverycoast } = req.body
    try {

        // await DashBoardData.create({
        //     banner,
        //     deliverycoast,
        //     admins: [req.user._id]
        // })
        const dbBanner = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID, 'banner')

        let Data = {
            deliverycoast,
            banner
        }


        if (banner && banner != dbBanner.banner) {
            console.log('first')
            const uploadedImage = await cloudinary.uploader.upload(banner, { resource_type: 'image', folder: 'banner_Images' })
            Data.banner = uploadedImage.secure_url
        }

        await DashBoardData.findByIdAndUpdate(process.env.ADMIN_DB_DOC_ID, Data)
        const DBdata = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID)

        return res.status(200).json(DBdata)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}

const getSiteData = async (req, res) => {
    const { uid } = req.params
    try {

        const DBdata = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID)
        const role = await uid ? User.findById(uid, 'role -_id') : 'not logged'

        if (role == 'admin') {
            return res.status(200).json(DBdata)

        } else {
            const data = {
                banner: DBdata.banner,
                deliverycoast: DBdata.deliverycoast
            }
            return res.status(200).json(data)

        }



    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}

const getAdmins = async (req, res) => {
    try {
        const { admins } = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID, 'admins').populate('admins', '-password -cart -whishlist -verified -provider -updatedAt -createdAt -orders -allowAccessFromMultiplePlaces -__v')

        return res.status(200).json(admins)




    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}

const changeAdmins = async (req, res) => {
    const { id, action } = req.body
    try {
        if (action === 'remove') {

            await DashBoardData.findByIdAndUpdate(process.env.ADMIN_DB_DOC_ID, {
                $pull: { admins: id }
            })
            await User.findByIdAndUpdate(id, {
                role: 'user'
            })

        } else {

            await DashBoardData.findByIdAndUpdate(process.env.ADMIN_DB_DOC_ID, {
                $push: { admins: id }
            })
            await User.findByIdAndUpdate(id, {
                role: 'admin'
            })

        }

        const { admins } = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID, 'admins').populate('admins', '-password -cart -whishlist -verified -provider -updatedAt -createdAt -orders -allowAccessFromMultiplePlaces -__v')

        return res.status(200).json(admins)

    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}
module.exports = {
    dashboardData,
    editSite,
    getSiteData,
    getAdmins,
    changeAdmins,
}