const axios = require('axios');

const API_KEY = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RJM01ERTVMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkudEtjVkNzc2RwUFNoUjZPM2tIdnZLQVdqSXJlUFZUa19CLVczVm82RkhKR19CN253dWRUZ3pLOHc5TGJVRVFPdFpual9tcl9iTVlHZFpObks3RkRwR1E=';
const INTEGRATION_ID = 3932861;



// const createPayment = async (req, res) => {

//     try {
//         const payload = {
//             "amount_cents": req.body.amount, // The payment amount in cents
//             "currency": "EGP",
//             "merchant_order_id": req.user.email, // Your unique order ID
//             "integration_id": INTEGRATION_ID,
//             "billing_data": {
//                 "email": req.user.email // The customer email
//             }
//         };

//         const resp = await axios.post('https://accept.paymob.com/api/acceptance/payments', payload, {
//             // const { data: { id, payment_token } } = await axios.post('https://accept.paymobsolutions.com/api/acceptance/post_pay', payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         });
//         console.log(resp)

//         // res.json({ id, payment_token });
//         res.json(resp.data);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'An error occurred while creating the payment.' });
//     }

// }



// const createPaymentRequest = async (amount, callbackUrl, description, email, name) => {
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
        return res.json(paymentKeyReq.data);

    } catch (error) {
        console.log(error);
        return res.json(error.message);
    }
};






module.exports = {
    createPayment,

};