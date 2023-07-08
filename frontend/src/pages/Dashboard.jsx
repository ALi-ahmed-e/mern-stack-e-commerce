import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Dashboard = () => {
    const { user, isLoading } = useSelector(s => s.Auth)
    const navigate = useNavigate()

    useEffect(() => {

        !isLoading && !user ? navigate('/') : user?.role !== 'admin' && navigate('/err')

    }, [isLoading]);

    return (
        <div className=' pb-10 db'>

            <div className=' text-center py-2 mt-2 rounded-t-[0px] mx-auto cd  w-[98%]'>


                <ul className="flex py-5 justify-center flex-col font-medium  rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                    <li>
                        <NavLink  to='statistics'className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> statistics</NavLink>
                    </li>
                    <li>
                        <NavLink  to='Modify-shop'  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">  Modify shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='create-product' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create product</NavLink>
                    </li>
                    <li>
                        <NavLink  to='products'  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products list</NavLink>
                    </li>
                    <li>
                        <NavLink  to='all-orders'  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Orders list</NavLink>
                    </li>
                </ul>



                {/* <NavLink to='statistics' className="  mx-14 inline-block hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-2 dark:border-purple-400  dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" >
                  
                        statistics
                
                </NavLink>

                <NavLink to='Modify-shop' className=" mx-14  inline-block hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-2 dark:border-purple-400  dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" >
                Modify the shop
                  
                </NavLink>

                <NavLink to='create-product' className=" mx-14  inline-block hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-2 dark:border-purple-400  dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" >
                   create product
                  
                </NavLink>


                <NavLink to='products' className=" mx-14  inline-block hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-2 dark:border-purple-400  dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" >
                   products list
                  
                </NavLink> */}



            </div>

            <Outlet />
            {/* <InfoCards />

            <Charts />

            

                <Form />

            


            <Products /> */}
        </div>
    )
}

export default Dashboard





// http://localhost:3000/


// http://localhost:3000/auth/google/callback


// http://localhost:8000/api

// http://localhost:8000/api/auth/google/callback

// http://localhost:8000

// http://localhost:8000/auth/google/callback


