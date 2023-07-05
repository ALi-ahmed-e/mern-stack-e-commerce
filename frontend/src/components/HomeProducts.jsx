import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../store/dashboardSlice'
import { addProductToWhishlist } from '../store/authSlice'

const HomeProducts = () => {
  const { user } = useSelector(s => s.Auth)
  const { products, page, number_of_products } = useSelector(s => s.Dashboard)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getProducts({ page: 1 }))
  }, []);


  const addTowhishList = (id) => {
    dispatch(addProductToWhishlist({ productID: id }))
  }




  return (
    <div>

      {products?.map(product =>
        { return product.avilable &&<div key={Math.random()} className=' inline-block  w-full  max-w-[400px] '>
          <div className="relative m-1 flex w-full scale-[85%] max-w-[340px] mx-auto flex-col overflow-hidden rounded-lg border dark:border-slate-700 border-gray-100 dark:bg-slate-800 dark:text-white bg-white shadow-md">
            <div
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                className="object-cover w-full "
                src={product.images[0]}
                alt="product image"
              />
            </div>
            <div className="mt-4 px-5 pb-5">
              <div onClick={() => navigate(`/product/${product._id}`)}>
                <h5 className="text-xl tracking-tight text-slate-900 dark:text-white cursor-pointer">
                  {product.name}
                </h5>
              </div>
              <div className="mt-2 mb-5 flex items-center justify-between dark:text-white text-slate-900">
                <p>
                  <span className="text-3xl font-bold ">${product.discountPrice}</span>
                  <span className="text-sm  line-through">${product.originalPrice}</span>
                </p>
              </div>

              <div className=' flex items-center justify-between '>

                <div
                  onClick={() => { user ? (user?.cart?.some(pr => pr.product == product._id) ? navigate('/cart') : navigate(`/product/${product._id}`)) : navigate('/login') }}
                  className="flex w-full mr-2 items-center cursor-pointer justify-center rounded-md bg-indigo-800 hover:bg-indigo-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"

                >

                  <AiOutlineShoppingCart size='24' className="mr-2 h-6 w-6" />
                  {user?.cart?.some(pr => pr.product == product._id) ? 'go to cart' : 'Add to cart'}
                </div>

                <div
                  onClick={() => { user ? addTowhishList(product._id) : navigate('/login') }}
                  className="flex items-center cursor-pointer justify-center rounded-md bg-indigo-800 hover:bg-indigo-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {user?.whishlist?.some(pr => pr == product._id) ? <AiFillHeart size='24' className="h-6  text-red-600 w-6 -mx-2" /> : <AiOutlineHeart size='24' className="h-6 w-6 -mx-2" />}


                </div>
              </div>


            </div>
          </div>

        </div>})}


      <div className="flex items-center justify-between mt-6">
        {new Array(number_of_products && Math.ceil(number_of_products / 10)).fill('') > 1 && <div
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
    </div>
  )
}

export default HomeProducts