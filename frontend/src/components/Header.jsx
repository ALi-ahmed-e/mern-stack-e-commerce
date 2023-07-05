import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsBell, BsCart2, BsSearch, BsShopWindow } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'
import { logOut } from '../store/authSlice'



const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.Auth)
    const classNames = (...classes) => classes.filter(Boolean).join(' ')





    // useEffect(() => {
    //     user?.role !== 'admin'&&navigate('/')
    // }, [user]);

    const searchSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${e.target.query.value}`)
    }


    return (<>
        <div className=' w-full h-16 bg-white dark:bg-slate-800 flex justify-between items-center'>
            <div className=' font-bold flex items-center mx-3 cursor-pointer' onClick={() => navigate('/')}>
                Shop
                <BsShopWindow size={30} className=' mx-2' />
            </div>



            <form className=' max-w-lg w-full hidden md:block' onSubmit={(e) => searchSubmit(e)}>

                <div className="relative">
                    <div className="absolute outline-none inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                        <BsSearch size={20} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full rounded-2xl outline-none px-2 py-3 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        name='query'
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-1 scale-90 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>


            {user && <div className=' flex items-center mx-2 '>

                {/* <BsBell size={24} className=' mx-3 cursor-pointer' /> */}
                <BsCart2 onClick={() => navigate('/cart')} size={24} className=' mx-3 cursor-pointer' />



                <Menu as="div" className="relative inline-block text-left w-fit h-fit">
                    <div>
                        <Menu.Button className='flex items-center focus:outline-none'>
                            <div className=' flex items-center mx-2 '>

                                <img crossOrigin="anonymous" src={user.image} className="w-10 h-10 rounded-xl cursor-pointer ring-2  object-cover" />
                            </div>



                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-3 z-10 mt-3 w-44 origin-top-right divide-y divide-gray-100 rounded-md dark:divide-black dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 border-[0.5px] dark:border-black focus:outline-none">

                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <p
                                            onClick={() => {
                                                navigate(`/profile`)
                                            }}
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                            )}
                                        >
                                            profile
                                        </p>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <p
                                            onClick={() => navigate('/whishlist')}
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                            )}
                                        >
                                            whishlist
                                        </p>
                                    )}
                                </Menu.Item>
                                {user?.orders?.length > 0 && <Menu.Item>
                                    {({ active }) => (
                                        <p
                                            onClick={() => navigate('/orders')}
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                            )}
                                        >
                                            orders
                                        </p>
                                    )}
                                </Menu.Item>}

                                {user?.role === 'admin' && <Menu.Item>
                                    {({ active }) => (
                                        <p
                                            onClick={() => navigate('dashboard/statistics')}
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                            )}
                                        >
                                            Dashboard
                                        </p>
                                    )}
                                </Menu.Item>}

                            </div>


                            <Menu.Item>
                                {({ active }) => (
                                    <p
                                        onClick={() => dispatch(logOut())}
                                        className={classNames(
                                            active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                        )}
                                    >
                                        logout
                                    </p>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>

            </div>}



            {!user && <div className=' mx-2 flex items-center '>
                <button onClick={() => navigate('/login')} className="px-4 py-0.5 mx-2 text-indigo-600  border-2 border-indigo-600 rounded-full duration-150 hover:bg-indigo-500/30 font-semibold  active:border-indigo-700">
                    Log in
                </button>
                <button onClick={() => navigate('/register')} className="px-4 py-1 mx-2 text-white bg-indigo-600 rounded-full duration-150 hover:bg-indigo-500 active:bg-indigo-700 font-semibold">
                    Register
                </button>

            </div>}

        </div>
        <div className=' md:hidden  w-full h-16 bg-white dark:bg-slate-800 flex justify-center items-center '>
            <form onSubmit={(e) => searchSubmit(e)} className=' max-w-lg w-full'>

                <div className="relative">
                    <div className="absolute outline-none inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                        <BsSearch size={20} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        type="search"
                        // id="default-search"
                        className="block w-full rounded-2xl    outline-none px-2 py-3 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        name='query'
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-1 scale-90 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    </>)
}

export default Header