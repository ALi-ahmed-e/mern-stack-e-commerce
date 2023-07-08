import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
} from 'chart.js';
import { getDashboardData } from '../../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useState } from 'react';
import InfoCards from './InfoCards';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const Charts = () => {
  const { user} = useSelector(s => s.Auth)
    const datas = useSelector(s => s.Dashboard.data)
    const { isLoading } = useSelector(s => s.Dashboard)
    const [orders, setorders] = useState([]);
    const [users, setusers] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        user && dispatch(getDashboardData())
    },[user]);

    const data = {
        labels: ['Google', 'email and password'],
        datasets: [
            {
                data: [datas?.usersWithGoogle, datas?.usersWithemaiandPassword],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    useEffect(() => {
        datas?.numberOfOrdersLast30Days && setorders(datas.numberOfOrdersLast30Days)
        datas?.numberOfUsersLast30Days && setusers(datas.numberOfUsersLast30Days)
        }, [datas]);




    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const data2 = {
        labels: users?.map(d => d.date.slice(8, 10) + ' ' +  new Date(2000, parseInt(d.date.slice(5, 7))).toLocaleString('default', { month: 'long' })),
        // labels: users?.map(d => d.date.slice(8, 10) + ' ' + monthName(d.date.slice(5, 7))),
        datasets: [
            {
                fill: true,
                label: 'users',
                data: users?.map(d => d.number),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
            , {
                fill: true,
                label: 'orders',
                data: orders?.map(d => d.number),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],

    };




    const changeLine = (time) => {
        if (time == '30') {
            datas?.numberOfUsersLast30Days && setusers(datas.numberOfUsersLast30Days)
            datas?.numberOfOrdersLast30Days && setorders(datas.numberOfOrdersLast30Days)
        } else {
            datas?.numberOfUsersLast7Days && setusers(datas.numberOfUsersLast7Days)
            datas?.numberOfOrdersLast7Days && setorders(datas.numberOfOrdersLast7Days)
        }
    }






    return (<>


        <div className=' flex items-center my-10 px-5 justify-center w-full'>
            <div className=' w-full h-[1px] bg-slate-600 ' />
            <div className=' text-3xl font-extrabold min-w-[139px] text-center '>
                Statistics
            </div>
            <div className=' w-full h-[1px] bg-slate-600 ' />
        </div>
        <InfoCards />
        <div className=' w-full p-3  text-center lg:flex justify-around '>
            {/* // <div className=' w-full p-3  text-center '>   */}
            {!datas&&isLoading && <Loader />}

            <div className=' cd w-[98%] max-w-2xl bg-white dark:bg-slate-800 dark:text-white p-3 rounded-xl inline-block m-2'>
                <div className=' font-extrabold'>
                    {/* users last 7 days */}
                </div>

                <select onChange={(e) => changeLine(e.target.value)}
                    id="countries"
                    defaultValue='30'
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="7">users/orders last 7 days</option>
                    <option value="30">users/orders last 30 days</option>

                </select>


                <div className=' w-[97%] h-[.5px] bg-slate-500/40 mx-auto my-2' />
                <Line options={options} data={data2} />
            </div>

            <div className=' pb-10 cd w-[98%] max-w-xs bg-white dark:bg-slate-800 dark:text-white p-3 rounded-xl inline-block m-2'>
                <div className=' font-extrabold'>
                    users service provider
                </div>
                <div className=' w-[97%] h-[.5px] bg-slate-500/40 mx-auto my-2' />
                <Doughnut data={data} />
            </div>










            {/* <div className=' cd w-[98%] max-w-4xl mx-auto bg-white dark:bg-slate-800 dark:text-white p-3 rounded-xl inline-block m-2'>
            <div className=' font-extrabold'>
                users last 7 days
            </div>
            <div className=' w-[97%] h-[.5px] bg-slate-500/40 mx-auto my-2' />
            <Line options={options} data={data2} />
        </div> */}
            {/* // </div> */}
        </div></>
    )
}

export default Charts