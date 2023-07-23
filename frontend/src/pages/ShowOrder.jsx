import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { changeOrderStatus, getOneOrder } from '../store/ordersSlice'
import { MdAdminPanelSettings, MdAccountCircle } from 'react-icons/md'
import { useState } from 'react'

const ShowOrder = () => {
    const { order } = useSelector(s => s.Orders)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const status = useRef()
    useEffect(() => {
        dispatch(getOneOrder(id))
    }, []);

    useEffect(() => {
        if (order?.status) {
            status.current.value = order.status
        }
    }, [order?.status]);


    return (<>
        <div className=" y-2 border-b border-gray-300 text-center text-xl font-semibold py-1">Order Info:</div>
        {order && <div className="font-sans overflow-auto text-base text-gray-700 dark:text-slate-100  dark:bg-slate-700 leading-6 flex flex-col w-[95%] mx-auto my-10  rounded-md">
            <table className="border-collapse w-full">
                <tr>
                    <th className="text-left py-2 border-b  pl-5 border-gray-300 dark:bg-slate-800 bg-slate-300 ">Shipping Address:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">
                        <p className="m-0">Zip Code: {order.shippingAddress.zipCode}</p>
                        <p className="m-0">Apartment: {order.shippingAddress.apartment}</p>
                        <p className="m-0">Floor: {order.shippingAddress.floor}</p>
                        <p className="m-0">Building: {order.shippingAddress.building}</p>
                        <p className="m0">Street: {order.shippingAddress.street}</p>
                        <p className="m-0">City: {order.shippingAddress.city}</p>
                        <p className="m-0">Country: {order.shippingAddress.country}</p>
                    </td>
                </tr>

                <tr>
                    <th className="text-left py-2 border-b border-gray-300  dark:bg-slate-800 bg-slate-300 pl-5 ">Phone:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">0{order.user.phoneNumber}</td>
                </tr>

                <tr>
                    <th className="text-left py-2 border-b border-gray-300  dark:bg-slate-800 bg-slate-300 pl-5 ">Total Price:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">{order.totalPrice} EGP</td>
                </tr>
                <tr>
                    <th className="text-left py-2 border-b border-gray-300 dark:bg-slate-800 bg-slate-300  pl-5">Status:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">
                        <select ref={status} onChange={(e) => dispatch(changeOrderStatus({ id: order._id, status: e.target.value }))} className=' dark:bg-slate-400 p-1 rounded-md cursor-pointer dark:text-slate-700'>
                            <option value="Processing">Processing</option>
                            <option value="Declined">Declined</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th className="text-left py-2 border-b border-gray-300 dark:bg-slate-800 bg-slate-300  pl-5">Payment Info:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">
                        <p className="m-0">Status: {order.paymentInfo.status}</p>
                        <p className="m-0">Type: {order.paymentInfo.type}</p>
                    </td>
                </tr>
                <tr>
                    <th className="text-left py-2 border-b border-gray-300 dark:bg-slate-800 bg-slate-300  pl-5">Paid At:</th>
                    <td className="text-left py-2 border-b pl-5 border-gray-300">{order.paidAt}</td>
                </tr>
                <tr>
                    <th className="text-left py-2  dark:bg-slate-800 bg-slate-300 pl-5">Order ID:</th>
                    <td className=" pl-5 text-left py-2">{order._id}</td>
                </tr>
            </table>
        </div>}

        <div className='flex flex-col'>
            <div className=" y-2 border-b border-gray-300 text-center text-xl font-semibold py-1">Products:</div>
            <div className="text-left py-2 ">
                {order?.products.map(({ name, id, description, quant, size, color }) =>
                    <div key={Math.random()} className="justify-between relative overflow-hidden mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start">

                        <img
                            src={id.images[0]}
                            alt="product-image"
                            className="w-full rounded-lg sm:w-40"
                        />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                                    {name}
                                </h2>
                                <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{color}</p>
                                <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{size}</p>
                                <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{quant}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <button onClick={() => navigate(`/product/${id._id}`)} className=' px-2 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white'>Show</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className=" y-2 border-b border-gray-300 text-center text-xl font-semibold py-1">Buyer:</div>
        <div className='flex justify-between items-center'>
            <div className=' w-[99%]  sm:flex-row-reverse  mx-auto p-3 flex-col flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>
                <div className=' mb-3'>
                    {order?.user.role == 'admin' ? <div className=' text-xl flex items-center'>admin<MdAdminPanelSettings className=' mx-2' size={50} /></div> : <div className=' text-xl flex items-center'>user<MdAccountCircle className=' mx-2' size={50} /></div>}
                </div>

                <div className=' flex sm:flex-row flex-col items-center'>
                    <img src={order?.user.image} className=' w-36 h-36 rounded-3xl object-cover' alt="user image" />

                    <input disabled
                        type="text" className=' text-xl font-semibold border-b-2 my-5 mx-2 border-none  rounded-md bg-transparent  p-1  outline-none' defaultValue={order?.user.name} />

                </div>

            </div>

        </div>
    </>
    )
}

export default ShowOrder