import React, { useEffect } from 'react'
import { getSiteData } from '../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from 'react-icons/ai'
const Home = () => {
  const dispatch = useDispatch()
  const { dbData } = useSelector(s => s.Dashboard)

  // function getCookie(key) {
  //   var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  //   return b ? b.pop() : "";
  // }

  useEffect(() => {
    dispatch(getSiteData())
    // console.log(getCookie('user').toString())
  }, []);

  return (
    <div className=' pb-10'>
      <div className=' my-10 w-[95%] relative rounded-xl max-w-[1200px] min-h-fit flex items-center justify-center mx-auto bg-red-400 object-cover overflow-hidden'>
        <img crossOrigin="anonymous" src={dbData?.banner} className=' w-full' alt="" />

      </div>



      <div className=' w-full'>

        <div className="relative m-10 flex w-full scale-[85%] max-w-xs flex-col overflow-hidden rounded-lg border dark:border-slate-700 border-gray-100 dark:bg-slate-800 dark:text-white bg-white shadow-md">
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="object-cover"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="product image"
            />
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900 dark:text-white">
                Nike Air MX Super 2500 - Red
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between dark:text-white text-slate-900">
              <p>
                <span className="text-3xl font-bold ">$449</span>
                <span className="text-sm  line-through">$699</span>
              </p>
            </div>
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-indigo-800 hover:bg-indigo-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              
              <AiOutlineShoppingCart size='24' className="mr-2 h-6 w-6" />
              Add to cart
            </a>
          </div>
        </div>


      </div>


    </div>
  )
}

export default Home