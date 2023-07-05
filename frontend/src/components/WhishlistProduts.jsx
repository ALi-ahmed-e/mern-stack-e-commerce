import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWhishListProducts } from '../store/productsSlice'
import { FaTrash } from 'react-icons/fa'
import { addProductToWhishlist } from '../store/authSlice'

const WhishlistProduts = () => {
    const { whishlistProducts } = useSelector(s => s.Products)
    const { user } = useSelector(s => s.Auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWhishListProducts())
    }, [user])

    // :<h1 className="my-10 text-center text-xl ">no items in your cart</h1>



    return (

        <div className="rounded-lg md:w-2/3 mx-auto">

            {whishlistProducts?.map(product => <div key={Math.random()}  style={{ opacity: product.avilable ? '100%' : '50%' }}className="justify-between relative overflow-hidden mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start">
                {!product.avilable && <div className="absolute left-0 top-0 h-16 w-16">
                    <div
                        className="absolute  transform -rotate-45  text-red-900 bg-red-300 rounded-md border-red-600 text-center  font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                        Not Avilable
                    </div>
                </div>
                }
                <img
                    src={product.images[0]}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                            {product.name}
                        </h2>
                        {/* <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{product.color}</p> */}
                        {/* <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 bg-sky-500/20 p-1 px-2 w-fit rounded-lg">{product.size}</p> */}
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        {/* <div className="flex items-center border-gray-100 select-none">
                            <span onClick={() => changeQuant('decrease', product)} className="cursor-pointer rounded-l bg-gray-100 dark:bg-gray-700 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                -
                            </span>
                            <div className=' px-3 py-1 bg-gray-100 dark:bg-gray-700 border-x-[1px]'>{product.quant}</div>
                            <span onClick={() => changeQuant('increase', product)} className="cursor-pointer rounded-r bg-gray-100 dark:bg-gray-700 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                +
                            </span>
                        </div> */}
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-700 dark:text-gray-50">{product.discountPrice} $</p>

                            <button className=' border-[1px] hover:opacity-75 border-red-500 rounded-md bg-red-300 dark:bg-red-900 p-1' onClick={() => dispatch(addProductToWhishlist({ productID: product._id }))}>
                                <span className=' sm:block hidden '>Remove</span>
                                <span className=' sm:hidden '><FaTrash size='20' /></span>
                            </button>


                        </div>
                    </div>
                </div>
            </div>)}



        </div>
    )
}

export default WhishlistProduts