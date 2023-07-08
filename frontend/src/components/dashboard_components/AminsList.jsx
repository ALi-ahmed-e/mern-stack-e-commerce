import React from 'react'
import { AiOutlineLoading3Quarters, AiOutlineUserAdd } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { changeAdmins } from '../../store/dashboardSlice'

const AminsList = ({ admins, isLoading }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(s => s.Auth)

    const addAdminHandler = (e) => {
        e.preventDefault()
        const id = e.target.id.value
        dispatch(changeAdmins({ id, action: 'add' }))
    }

    return (
        <div className=' w-full text-center'>

            <form onSubmit={addAdminHandler} className=' w-[97%] mb-3  p-2 dark:bg-slate-700 bg-white flex items-center justify-center mx-auto rounded-md -mt-6 '>
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineUserAdd className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user ID..." required name='id' />
                </div>
                <button type="submit" className=" py-2 px-4 ml-2  font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading ? <AiOutlineLoading3Quarters size='25' className=' mx-auto animate-spin text-white' /> : 'Add'}

                </button>
            </form>

            {admins?.map(admin =>
                <div key={Math.random()} className="w-full inline-block m-0 sm:m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {admin._id != user._id && <div className=' w-full mt-3 flex items-center justify-end'>
                        <button onClick={() => dispatch(changeAdmins({ id: admin._id, action: 'remove' }))} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>

                    </div>}
                    <div className="flex flex-col pt-2 items-center py-5">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={admin.image} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{admin.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{admin.role}</span>
                        <div className="flex flex-col w-full mt-4  md:mt-6">

                            <div className='flex mx-auto'>Email: {admin.email}</div>
                            <div className='flex mx-auto'>Phone Number: 0{admin.phoneNumber}</div>

                        </div>
                    </div>
                </div>)}

            {/* <div className="w-full  inline-block h-64 max-w-sm bg-white border m-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            </div> */}
        </div>
    )
}

export default AminsList