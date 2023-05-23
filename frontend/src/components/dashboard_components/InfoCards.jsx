import axios from 'axios'
import React, { useEffect } from 'react'
import { AiOutlineDollarCircle, AiOutlineUser } from 'react-icons/ai'
import {FaRegEnvelopeOpen } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const InfoCards = () => {
const {data} = useSelector(s=>s.Dashboard)
  

    // useEffect(() => {
    //     getData()
    // }, []);


    return (
        <div className=' w-full p-3 text-center lg:flex justify-around '>




            <div className='  inline-block m-2 bg-white dark:bg-slate-800 items-center w-[96%] max-w-[300px] py-2 pr-3 rounded-lg cd '>
                <div className='flex justify-between items-center'>
                    <div className=' flex flex-col pl-3 py-2'>
                        <span className=' text-sky-700 text-sm'>CREDIT</span>

                        <span className=' font-semibold text-2xl'>
                            $10000
                        </span>

                    </div>


                    <AiOutlineDollarCircle size={50} className=' dark:text-blue-500 text-blue-800' />
                </div>
            </div>


            <div className='  inline-block m-2 bg-white dark:bg-slate-800 items-center w-[96%] max-w-[280px] py-2 pr-3 rounded-lg cd '>
                <div className='flex justify-between items-center'>
                    <div className=' flex flex-col pl-3 py-2'>
                        <span className=' text-sky-700 text-sm'>USERS</span>

                        <span className=' font-semibold text-2xl'>
                            {data?.number_Of_Users?data?.number_Of_Users:0}
                        </span>

                    </div>


                    <AiOutlineUser size={50} className=' dark:text-blue-500 text-blue-800' />
                </div>
            </div>


            <div className='  inline-block m-2 bg-white dark:bg-slate-800 items-center w-[96%] max-w-[280px] py-2 pr-3 rounded-lg cd '>
                <div className='flex justify-between items-center'>
                    <div className=' flex flex-col pl-3 py-2'>
                        <span className=' text-sky-700 text-sm'>ORDERS</span>

                        <span className=' font-semibold text-2xl'>
                        {data?.numberOfOrders?data?.numberOfOrders:0}
                        </span>

                    </div>


                    <FaRegEnvelopeOpen size={50} className=' dark:text-blue-500 text-blue-800' />
                </div>
            </div>





        </div>
    )
}

export default InfoCards