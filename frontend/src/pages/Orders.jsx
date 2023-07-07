import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Orders = () => {
    const [orders, setorders] = useState([])
    const { user } = useSelector(s => s.Auth)

    const getOr = async () => {
        try {
            const res = await axios.get('/api/order/getUserOrders', { withCredentials: true })
            setorders(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOr()
    }, [user])


    const formatDate = (format) => {
        const date = new Date(format);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return formattedDate
    }

    return (
        <div className='text-center'>

         

            {orders.map(order => <div key={Math.random()} className="rounded-md relative inline-block w-64 shadow-2xl p-3 bg-white dark:bg-slate-700 m-5 ">
                <div className="py-2">
                    <div className="text-center text-xl font-bold">ORDER</div>
                    <div className="text-center text-xs font-bold">Order details</div>
                </div>
                <div className="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
                <div className="text-xs pl-2">
                    <div className="text-xs mb-1">Customer：{user.name}</div>
                    <div className="text-xs mb-1">TelePhone：{user.phoneNumber}</div>
                    <div className="text-xs mb-1">Status：{order.status}</div>
                    <div>OrderNumber：{order._id}</div>
                </div>
                <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                    <div className="flex text-sm pt-1 px-1">
                        <span className="w-2/6">Name</span>
                        <span className="w-2/6 text-right">Price</span>
                        <span className="w-2/6 text-right">Number</span>
                    </div>
                    <div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                        {order.products.map(pr => <div key={Math.random()} className="flex justify-between text-sm">
                            <span className="w-2/6 truncate">{pr.name}</span>
                            <span className="w-2/6 text-right">${pr.price}</span>
                            <span className="w-2/6 text-right">{pr.quant}</span>
                        </div>)}

                    </div>
                </div>
                <div className="text-xs">
                    {/* <div className="mb-1">Discount：￥50</div> */}
                    <div className="mb-24"></div>
                    <div className="text-right">
                        <div>Time：{formatDate(order.createdAt)}</div>
                        <div className="font-bold text-sm">Total：{order.totalPrice} EGP</div>
                    </div>
                </div>
            </div>)}





        </div>
    )
}

export default Orders