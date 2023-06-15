import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, changeProductquant, getCartProduct } from '../store/productsSlice'
import { FaTrash } from 'react-icons/fa'
const Cart = () => {
  const { cartProducts, numberOfAvilableProductsInCart, subTotal } = useSelector(s => s.Products)
  const deliverycoast = useSelector(s => s.Dashboard.dbData) != null ? useSelector(s => s.Dashboard.dbData.deliverycoast) : 0
  const dispatch = useDispatch()


  // const renderPaypal = () => {
  //   window.paypal.Buttons({
  //     // Order is created on the server and the order id is returned
  //     createOrder() {
  //       return fetch("/my-server/create-paypal-order", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // use the "body" param to optionally pass additional order information
  //         // like product skus and quantities
  //         body: JSON.stringify({
  //           cart: [
  //             {
  //               sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
  //               quantity: "YOUR_PRODUCT_QUANTITY",
  //             },
  //           ],
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((order) => order.id);
  //     },
  //     // Finalize the transaction on the server after payer approval
  //     onApprove(data) {
  //       return fetch("/my-server/capture-paypal-order", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           orderID: data.orderID
  //         })
  //       })
  //         .then((response) => response.json())
  //         .then((orderData) => {
  //           // Successful capture! For dev/demo purposes:
  //           console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
  //           const transaction = orderData.purchase_units[0].payments.captures[0];
  //           alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
  //           // When ready to go live, remove the alert and show a success message within this page. For example:
  //           // const element = document.getElementById('paypal-button-container');
  //           // element.innerHTML = '<h3>Thank you for your payment!</h3>';
  //           // Or go to another URL:  window.location.href = 'thank_you.html';
  //         });
  //     }
  //   }).render('#paypal-button')
  // }

  const getCart = () => {
    // renderPaypal()

    dispatch(getCartProduct())
  }

  useEffect(() => {
    getCart()
  }, [])

  const changeQuant = async (action, product) => {
    dispatch(changeProductquant({ action, product }))

  }


  return (
    <div>



      <div className="pb-10 pt-20">



        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>






        {cartProducts?.length > 0 ? <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">


          <div className="rounded-lg md:w-2/3">

            {cartProducts?.map(product => <div key={Math.random()} className="justify-between mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={product.product.images[0]}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                    {product.product.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{product.color}</p>
                  <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{product.size}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100 select-none">
                    <span onClick={() => changeQuant('decrease', product)} className="cursor-pointer rounded-l bg-gray-100 dark:bg-gray-700 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      -
                    </span>
                    <div className=' px-3 py-1 bg-gray-100 dark:bg-gray-700 border-x-[1px]'>{product.quant}</div>
                    <span onClick={() => changeQuant('increase', product)} className="cursor-pointer rounded-r bg-gray-100 dark:bg-gray-700 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-700 dark:text-gray-50">{product.product.discountPrice} $</p>

                    <button className=' border-[1px] hover:opacity-75 border-red-500 rounded-md bg-red-300 dark:bg-red-900 p-1' onClick={() => dispatch(addProductToCart({ id: product.product._id, quant: product.quant, color: product.color, size: product.size }))}>
                      <span className=' sm:block hidden '>Remove</span>
                      <span className=' sm:hidden '><FaTrash size='20' /></span>
                    </button>


                  </div>
                </div>
              </div>
            </div>)}



          </div>
          {/* Sub total */}


          <div className="mt-6 h-full rounded-lg border dark:border-slate-700 bg-white dark:bg-gray-800 p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 dark:text-gray-50">Subtotal</p>
              <p className="text-gray-700 dark:text-gray-50">${subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-50">Shipping</p>
              <p className="text-gray-700 dark:text-gray-50">${deliverycoast}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold dark:text-gray-50">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold dark:text-gray-50">${parseInt(deliverycoast) + parseInt(subTotal)} EGP</p>
                {/* <p className="text-sm text-gray-700 dark:text-gray-200">including VAT</p> */}
              </div>
            </div>
            <div id='paypal-button'>
              <button disabled={numberOfAvilableProductsInCart <= 0} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>

        </div> : <h1 className="my-10 text-center text-xl ">no items in your cart</h1>}

      </div>


    </div>

  )
}

export default Cart;