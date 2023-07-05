import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: { id, payment_token } } = await axios.post('/api/payments/create-payment', {
        amount,
        orderId,
        email
      });

      // Redirect the user to the Paymob payment page
      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${id}?payment_token=${payment_token}`;
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
      </label>
      <label>
        Order ID:
        <input type="text" value={orderId} onChange={(event) => setOrderId(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;