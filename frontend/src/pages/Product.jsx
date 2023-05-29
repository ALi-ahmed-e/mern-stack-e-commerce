import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../store/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { Product } = useSelector(s => s.Products)

  useEffect(() => {
    id && dispatch(getProduct(id))
  }, [id]);




  const items = Product?.images.map(img => <img
    key={Math.random()}
    alt="ecommerce"
    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
    src={img}
    crossOrigin="anonymous" 
  />)






  return (
    <section className="text-gray-600 body-font overflow-hidden dark:text-white">
      <div className=" px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap rrr">




          <AliceCarousel
            mouseTracking
            responsive={{
              0: {
                items: 1,
              },
              // 672: {
              //   items: 2,
              // },
              // 824: {
              //   items: 2,
              //   itemsFit: 'contain'
              // },
              // 1024: {
              //   items: 3,
              //   itemsFit: 'contain',

              // }, 1256: {
              //   items: 4,
              //   itemsFit: 'contain',

              // }

            }}
            renderPrevButton={() => <AiOutlineArrowRight size='24' className=' inline rotate-180 cursor-pointer w-fit' />}
            renderNextButton={() => <AiOutlineArrowRight size='24' className=' inline cursor-pointer w-fit' />}
            disableDotsControls
            // disableButtonsControls
            autoPlayInterval={3000}
            infinite={true}
            autoPlay
            items={items} />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* <h2 className="text-sm title-font text-gray-500  dark:text-white tracking-widest">
          BRAND NAME
        </h2> */}
            <h1 className="text-gray-900  dark:text-white text-3xl title-font font-medium mb-1">
              {Product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">
              {Product?.description}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 ">
              <div className="flex">
                <span className="mr-3">Colors</span>
                {Product?.colors.map(color => <button key={Math.random()} className={`border-2 border-gray-300 ml-1 bg-${color != 'white' ? color != 'black' ? `${color}-500` : color : color} rounded-full w-6 h-6 focus:outline-none`} />)}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded dark:bg-slate-600 border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                    {Product?.sizes.map(size => <option key={Math.random()} defaultValue={size}>{size}</option>)}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center dark:text-gray-300 text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              {Product?.originalPrice != Product?.discountPrice ? <>
                <span className={`${Product?.discountPrice && 'line-through'} "title-font font-medium text-2xl dark:text-slate-200 text-gray-900"`}>
                  {Product?.originalPrice}$
                </span>
                <span className="title-font font-medium text-2xl dark:text-slate-200 text-gray-900 ml-4">
                  {Product?.discountPrice}$
                </span>
              </> : <>

                <span className="title-font font-medium text-2xl dark:text-slate-200 text-gray-900 ml-4">
                  {Product?.discountPrice}$
                </span>
              </>}
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                Buy
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Product