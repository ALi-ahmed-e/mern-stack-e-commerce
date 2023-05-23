import React from 'react'
import { useSelector } from 'react-redux'
import { MdAdminPanelSettings, MdAccountCircle } from 'react-icons/md'
const Profile = () => {
    const { user } = useSelector(s => s.Auth)








    return (
        <div>





            <div className=' w-[99%] mx-auto p-3 flex-row flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>
                <div className=' flex items-center'>
                    <img src={user?.image} className=' w-36 h-36 rounded-3xl object-cover' alt="user image" />
                    <input type="text" className=' text-xl font-semibold mx-2 border-b-2 min-w-[200px] rounded-md bg-transparent text-center p-1  outline-blue-600' defaultValue={user?.name} />

                </div>

                {user?.role == 'admin' ? <div className=' text-xl flex items-center'>admin<MdAdminPanelSettings className=' mx-2' size={50} /></div> : <div className=' text-xl flex items-center'>user<MdAccountCircle className=' mx-2' size={50} /></div>}
            </div>

            <div className=' w-[99%] mx-auto p-3 flex-row flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>
                l

            </div>






        </div>
    )
}

export default Profile