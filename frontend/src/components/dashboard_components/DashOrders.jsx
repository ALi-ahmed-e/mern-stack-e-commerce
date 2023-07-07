import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getallOrders } from '../../store/ordersSlice'
const DashOrders = () => {
    const { orders, page, number_of_orders } = useSelector(s => s.Orders)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getallOrders({ page: 1 }))
    }, []);



    return (
        <>
            <div className=' flex items-center my-10 px-5 justify-center w-full'>
                <div className=' w-full h-[1px] bg-slate-600 ' />
                <div className=' text-3xl font-extrabold w-[220px] text-center '>
                    Orders
                </div>
                <div className=' w-full h-[1px] bg-slate-600 ' />
            </div>
            {/* ################################################### */}



            <section className=" mx-auto  w-[95%] cd p-5 ">

                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-slate-700 dark:text-white">
                        Orders
                    </h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-slate-700 dark:text-blue-400">
                        {orders?.length} Orders
                    </span>
                </div>


                <div className="flex flex-col mt-6  ">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">


                                    <thead className="bg-gray-50 dark:bg-slate-700 w-full">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <span>buyer</span>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <span>ship to</span>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Total price</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Total price</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                products
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                show
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                        {orders?.map(order => <tr key={Math.random()}>

                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm hover:underline cursor-pointer hover:opacity-70 font-normal text-gray-500 dark:text-gray-300 ">

                                                    {order.user.name}
                                                </h2>
                                            </td>

                                            <td className=" py-4 text-sm font-medium text-gray-700 whitespace-nowrap" >
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 ">
                                                    <h2 className="text-sm hover:underline cursor-pointer hover:opacity-70 font-normal text-gray-500 dark:text-gray-300 ">
                                                        {order.shippingAddress.city}

                                                    </h2>
                                                </div>
                                            </td>


                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 ">
                                                    {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> */}
                                                    <h2 className="text-sm font-normal text-emerald-500">
                                                        {order.totalPrice} LE
                                                    </h2>
                                                </div>
                                            </td>



                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.createdAt.slice(0, 10)}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.products.length > 1 ? `${order.products.length} products` : `${order.products.length} product`}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.status}
                                            </td>

                                            <td onClick={() => navigate('/show_order/' + order._id)} className="px-4 underline dark:hover:text-blue-600 hover:text-blue-800 cursor-pointer py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                Show
                                            </td>


                                        </tr>)}





                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    {new Array(number_of_orders && Math.ceil(number_of_orders / 10)).fill('') > 1 && <div
                        onClick={() => dispatch(getProducts({ page: page - 1 }))}
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-slate-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>previous</span>
                    </div>
                    }


                    <div className="items-center mx-auto flex gap-x-3">

                        {new Array(number_of_orders && Math.ceil(number_of_orders / 10)).fill('').map((e, i) => <div onClick={() => dispatch(getallOrders({ page: i + 1 }))} key={Math.random()} className="px-2 py-1 text-sm text-blue-500 hover:dark:bg-slate-600 cursor-pointer hover:bg-blue-100/50- rounded-md dark:bg-slate-700 bg-blue-100/60" >
                            {i + 1}
                        </div>)}

                        {/* {console.log(new Array(number_of_products && Math.ceil(number_of_products / 1)).fill(''))} */}

                    </div>


                    {new Array(number_of_orders && Math.ceil(number_of_orders / 10)).fill('') > 1 &&
                        <div
                            onClick={() => dispatch(getallOrders({ page: page + 1 }))}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-slate-700"
                        >
                            <span>Next</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:-scale-x-100"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </div>
                    }
                </div>
            </section>












        </>
    )
}

export default DashOrders