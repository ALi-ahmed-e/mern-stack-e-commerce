const axios = require('axios');
const crypto = require('crypto');
const { createOrderFunction } = require('./ordersController');
const Order = require('../models/order');

const API_KEY = process.env.PB_API_KEY;
const INTEGRATION_ID = process.env.PB_INTEGRATION_ID;

const createPayment = async (req, res) => {
    const { amount } = req.body
    const { user } = req
    try {

        const { data } = await axios.post('https://accept.paymob.com/api/auth/tokens', { api_key: API_KEY })
        const authToken = data.token


        const orderReg = await axios.post("https://accept.paymob.com/api/ecommerce/orders",
            {
                "auth_token": authToken,
                "delivery_needed": "true",
                "amount_cents": amount * 100,
                "items": []
            })

        const paymentKeyReq = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys",
            {
                "auth_token": authToken,
                "amount_cents": amount * 100,
                "expiration": 3600,
                "order_id": orderReg.data.id,
                "billing_data": {
                    "apartment": user.addresses.apartment,
                    "email": user.email,
                    "floor": user.addresses.floor,
                    "first_name": user.name,
                    "street": user.addresses.street,
                    "building": user.addresses.building,
                    "phone_number": '+20' + user.phoneNumber,
                    "shipping_method": "PKG",
                    "postal_code": user.addresses.zipCode,
                    "city": user.addresses.city,
                    "country": user.addresses.country,
                    "last_name": ".",
                    "state": "Utah"
                },
                "currency": "EGP",
                "integration_id": INTEGRATION_ID
            })
        await createOrderFunction(user, { orderId: orderReg.data.id })
        return res.json(paymentKeyReq.data);

    } catch (error) {
        console.log(error);
        return res.json(error.message);
    }
};

const processedcallback = async (req, res) => {
    const respo = req.body



    const { id } = respo.obj
    const order_id = respo.obj.order.id

    const { secure_hash } = respo.obj.data

    const { success, is_voided, owner, pending, is_standalone_payment, is_refunded, is_capture, is_auth, amount_cents, has_parent_transaction, created_at, currency, error_occured, integration_id, is_3d_secure } = respo.obj
    const { pan, sub_type, type } = respo.obj.source_data
    const str = amount_cents + created_at + currency + error_occured + has_parent_transaction + id + integration_id + is_3d_secure + is_auth + is_capture + is_refunded + is_standalone_payment + is_voided + order_id + owner + pending + pan + sub_type + type + success
    // const str = amount_cents?.toString() + created_at?.toString() + currency?.toString() + error_occured?.toString() + has_parent_transaction?.toString() + id?.toString() + integration_id?.toString() + is_3d_secure?.toString() + is_auth?.toString() + is_capture?.toString() + is_refunded?.toString() + is_standalone_payment?.toString() + is_voided?.toString() + order_id?.toString() + owner?.toString() + pending?.toString() + pan?.toString() + sub_type?.toString() + type?.toString() + success?.toString()
    const hasedStr = crypto.createHmac('SHA512', process.env.PB_SECRET).update(str).digest('hex')

    // console.log('respo')
    // console.log(respo)

    // console.log('str')
    // console.log(str)

    // console.log('secure_hash')
    // console.log(secure_hash)

    // console.log('hasedStr')
    // console.log(hasedStr)

    const order = await Order.findOne({ orderId: order_id })
    if (secure_hash == hasedStr) {

        if (success) {
            await Order.findByIdAndUpdate(order._id, {
                paymentInfo: {
                    status: 'paid'
                }
            })
            return res.status(200)
        } else {
            await Order.findByIdAndUpdate(order._id, {
                paymentInfo: {
                    status: 'declined'
                }
            })
            return res.status(200)
        }


    } else {
        await Order.findByIdAndUpdate(order._id, {
            paymentInfo: {
                status: 'declined'
            }
        })
        console.log('error')
        return res.status(400)

    }
}







module.exports = {
    createPayment,
    processedcallback
};