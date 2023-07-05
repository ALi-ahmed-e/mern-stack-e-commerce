import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setProduct } from '../../store/productsSlice'
import { DeleteProduct} from '../../store/dashboardSlice'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../store/dashboardSlice'
const Products = () => {
    const { products, page, number_of_products } = useSelector(s => s.Dashboard)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getProducts({ page: 1 }))
    }, []);

    return (<><div className=' flex items-center my-10 px-5 justify-center w-full'>
        <div className=' w-full h-[1px] bg-slate-600 ' />
        <div className=' text-3xl font-extrabold w-[350px] text-center '>
            Products
        </div>
        <div className=' w-full h-[1px] bg-slate-600 ' />
    </div>
        <section className=" mx-auto  w-[95%] cd p-5 ">

            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-slate-700 dark:text-white">
                    Products
                </h2>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-slate-700 dark:text-blue-400">
                    {products?.length} products
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
                                                <span>image</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <button className="flex items-center gap-x-2">
                                                <span>Price</span>

                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <button className="flex items-center gap-x-2">
                                                <span>Discount Price</span>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Stock
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            avilable
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            delete
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Edit
                                        </th>
                                        {/* <th
                                        {/* <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Teams
                                        </th> */}
                                        {/* <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                    {products?.map(product => <tr key={Math.random()}>

                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center ">

                                                <div className="flex items-center ">
                                                    <img
                                                        className="object-cover w-10 h-10 rounded-full"
                                                        src={product.images[0]}
                                                        alt=""
                                                        crossOrigin="anonymous" 
                                                    />

                                                </div>
                                            </div>
                                        </td>

                                        <td className=" py-4 text-sm font-medium text-gray-700 whitespace-nowrap" onClick={()=>navigate(`/product/${product._id}`)}>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 ">
                                                <h2 className="text-sm hover:underline cursor-pointer hover:opacity-70 font-normal text-gray-500 dark:text-gray-300 ">
                                                    {product.name}
                                                </h2>
                                            </div>
                                        </td>


                                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 ">
                                                {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> */}
                                                <h2 className="text-sm font-normal text-emerald-500">
                                                    {product.originalPrice} LE
                                                </h2>
                                            </div>
                                        </td>


                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {product.discountPrice} LE
                                        </td>


                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {product.stock}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {product.avilable.toString()}
                                            {/* <input type="checkbox" name="avilable" id="" /> */}
                                        </td>
                                        {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-slate-700 bg-indigo-100/60">
                                                    Design
                                                </p>
                                                <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-slate-700 bg-blue-100/60">
                                                    Product
                                                </p>
                                                <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-slate-700 bg-pink-100/60">
                                                    Marketing
                                                </p>
                                            </div>
                                        </td> */}

                                        <td className="px-4 py-4 text-sm whitespace-nowrap" onClick={(e) => {
                                            // e.target.parentElement.parentElement.parentElement.parentElement.remove()
                                            dispatch(DeleteProduct(product._id))
                                            // e.target.parentElement.parentElement.parentElement.remove()
                                        }}>
                                            <div className="flex items-center gap-x-6">
                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>

                                            </div>
                                        </td>


                                        <td onClick={(e) => {
                                            dispatch(setProduct(product))
                                            navigate('/dashboard/create-product')
                                        }} className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">


                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>)}





                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6">
            {new Array(number_of_products && Math.ceil(number_of_products / 10)).fill('') > 1 &&         <div
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

                    {new Array(number_of_products && Math.ceil(number_of_products / 10)).fill('').map((e, i) => <div onClick={() => dispatch(getProducts({ page: i + 1 }))} key={Math.random()} className="px-2 py-1 text-sm text-blue-500 hover:dark:bg-slate-600 cursor-pointer hover:bg-blue-100/50- rounded-md dark:bg-slate-700 bg-blue-100/60" >
                        {i + 1}
                    </div>)}

                    {/* {console.log(new Array(number_of_products && Math.ceil(number_of_products / 1)).fill(''))} */}

                </div>


                {new Array(number_of_products && Math.ceil(number_of_products / 10)).fill('') > 1 &&
                    <div
                        onClick={() => dispatch(getProducts({ page: page + 1 }))}
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

    </>)
}

export default Products