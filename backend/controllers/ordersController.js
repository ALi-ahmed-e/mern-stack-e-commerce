const User = require("../models/user");
const Order = require("../models/order");
const DashBoardData = require("../models/dashboardData");
const sendEMail = require('../utils/nodeMailer');

const createOrder = async (req, res) => {
    const user = req.user
    try {
        const address = user.addresses;
        if (
            !address.country ||
            !address.city ||
            !address.apartment ||
            !address.floor ||
            !address.street ||
            !address.building ||
            !address.zipCode
        ) return res.status(400).json('address is required')


        const { deliverycoast } = await DashBoardData.findById(process.env.ADMIN_DB_DOC_ID, 'deliverycoast')

        const { cart } = await User.findById(req.user._id, 'cart -_id').populate('cart.product')
        let subTotal = 0
        let products = []

        cart.map(({ product, quant, color, size }) => {
            if (product.avilable) {
                const newproduct = {
                    name: product.name,
                    description: product.description,
                    id: product._id,
                    size,
                    quant,
                    color,
                    price:product.discountPrice

                }
                products.push(newproduct)
                subTotal += (parseInt(product.discountPrice) * parseInt(quant))
            }
        })


        const order = await Order.create({
            shippingAddress: user.addresses,
            user: user._id,
            totalPrice: parseInt(deliverycoast) + parseInt(subTotal),
            products: products
        })

        await User.findByIdAndUpdate(user._id, {
            $push: { orders: order._id },
            cart: []
        })

        const htmlTemplate = `
        <html>
        <head>
          <meta charset="UTF-8">
          <title>New Order Created</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333;
            line-height: 2.5;
            display: flex;
            flex-direction: column;
          }
          h1, h2 {
            margin: 0;
            font-weight: bold;
          }
          h1 {
            font-size: 24px;
          }
          h2 {
            font-size: 18px;
          }
          p {
            margin: 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;

          }
          th {
            background-color: #f2f2f2;
          }
          div{
              border-bottom: 1px solid gray;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              text-align: center;
          }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <th>Shipping Address:</th>
              <td>
                <p>Zip Code: ${order.shippingAddress.zipCode}</p>
                <p>Apartment:${order.shippingAddress.apartment}</p>
                <p>Floor:${order.shippingAddress.floor}</p>
                <p>Building:${order.shippingAddress.building}</p>
                <p>Street:${order.shippingAddress.street}</p>
                <p>City:${order.shippingAddress.city}</p>
                <p>Country:${order.shippingAddress.country}</p>
              </td>
            </tr>
            <tr>
              <th>products:</th>
              <td>
            ${order.products.map(({ name, description, quant, size, color }) => {
            return `      <div>
                      <p>name: ${name}</p>
                      <p>description: ${description}</p>
                      <p>quantity: ${quant}</p>
                      <p>size: ${size}</p>
                      <p>color: ${color}</p>
                        
                          </div> `})}
              </td>
            </tr>
            <tr>
              <th>User id:</th>
              <td>${order.user}</td>
            </tr>
            <tr>
              <th>Total Price:</th>
              <td>${order.totalPrice}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>${order.status}</td>
            </tr>
            <tr>
              <th>Payment Info:</th>
              <td>
                <p>Status: ${order.paymentInfo.status}</p>
                <p>Type:${order.paymentInfo.type}</p>
              </td>
            </tr>
            <tr>
              <th>Paid At:</th>
              <td>${order.paidAt}</td>
            </tr>
            <tr>
              <th>Order ID:</th>
              <td>${order._id}</td>
            </tr>
          </table>
        </body>
      </html>


        `

        await sendEMail(process.env.APP_EMAIL_ADDRESS, `New Order Created by ${user.name}`, htmlTemplate)

        res.status(200).json({ orderId: order._id })


    } catch (error) {
        res.status(400).json(error.message)
    }

}

const getUserOrders = async (req, res) => {
const {orders} = await User.findById(req.user._id,'orders').populate('orders')
res.status(200).json(orders)

}

module.exports = {
    createOrder,
    getUserOrders,
}