import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdAdminPanelSettings, MdAccountCircle, MdRadioButtonChecked } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { BiLoaderAlt } from 'react-icons/bi'
import { RadioGroup, Switch } from '@headlessui/react'
import { editUser } from '../store/authSlice'
import { setTheme } from '../store/themeSlice'

const Profile = () => {
    const { user, isLoading } = useSelector(s => s.Auth)
    const [image, setimage] = useState()
    const [showWarn, setshowWarn] = useState(false)
    const dispatch = useDispatch()
    const { theme } = useSelector(s => s.Theme)
    const [enabled, setenabled] = useState(user.allowAccessFromMultiplePlaces)

    const convertTo64Base = (file) => {
        setshowWarn(true)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setimage(reader.result)
        }

    }



    const saveChanges = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            gender: e.target.gender.value,
            email: e.target.email.value,
            image, phoneNumber: e.target.phoneNumber.value,
            allowAccessFromMultiplePlaces: enabled,
            addresses: {
                zipCode: e.target.zipCode.value,
                apartment: e.target.apartment.value,
                floor: e.target.floor.value,
                building: e.target.building.value,
                street: e.target.street.value,
                city: e.target.city.value,
                country: e.target.country.value
            }
        }


        dispatch(editUser(data))
    }
    return (
        <form onSubmit={saveChanges} className=' pb-10'>


            



            <div className=' w-[99%]  sm:flex-row-reverse relative  mx-auto p-3 pt-5 flex-col flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>
                <div className=' mb-3'>
                    {user?.role == 'admin' ? <div className=' text-xl flex items-center'>admin<MdAdminPanelSettings className=' mx-2' size={50} /></div> : <div className=' text-xl flex items-center'>user<MdAccountCircle className=' mx-2' size={50} /></div>}
                </div>
                <div className='top-1 right-1 absolute'>id: {user?._id}</div>

                <div className=' flex sm:flex-row flex-col items-center'>
                    <div className=' relative '>
                        <img src={image ? image : user?.image} className=' w-36 h-36 rounded-3xl object-cover' alt="user image" />
                        <input type="file" id='pi' onChange={e => convertTo64Base(e.target.files[0])} hidden accept='image/*' />
                        <label htmlFor='pi' className=' w-9 h-9 ring-1  hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer -top-1 -right-2 flex items-center justify-center p-2 rounded-full bg-white dark:bg-slate-800 absolute text-black dark:text-white'>
                            <FiEdit size={30} />
                        </label>
                    </div>
                    <input disabled
                        type="text" className=' text-xl font-semibold border-b-2 my-5 mx-2 border-none  rounded-md bg-transparent  p-1  outline-none' defaultValue={user?.name} />

                </div>
                

            </div>

            <div className=' w-[99%] mx-auto p-3 flex-col flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>
                <div className=' w-full'>
                    {/* name and email */}
                    <div className=' flex w-full '>
                        {/* name */}
                        <div className="mb-6  w-1/2 mx-1 ">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name"
                                required
                                defaultValue={user?.name}
                            />
                        </div>
                        {/* email */}
                        <div className="mb-6  w-1/2 mx-1 ">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 outline-none border-none border border-gray-300 text-gray-900 text-center sm:text-left text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email"
                                required
                                disabled={user?.provider == 'google'}
                                defaultValue={user?.email}

                            />
                        </div>

                    </div>
                    {/* gender and phone number */}
                    <div className='mb-6 flex items-center'>
                        {/* phone number */}
                        <div className="  w-[70%] mx-1 ">
                            <label
                                htmlFor="phoneNumber"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your phone number
                            </label>
                            <input
                                type='number'
                                minLength={10}
                                maxLength={11}
                                id="phoneNumber"
                                name="phoneNumber"
                                className="bg-gray-50 numberInput outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="phone number"
                                required
                                defaultValue={user?.phoneNumber}
                            />
                        </div>


                        {/* gender */}
                        <div className='w-[30%] mx-1'>
                            <label
                                htmlFor="gender"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                gender
                            </label>
                            <select
                                defaultValue={user?.gender}
                                id="gender"
                                name='gender'
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>

                    </div>


                    {/* address and zipcode */}
                    <div className=' flex items-center justify-around'>

                        {/* zip code */}
                        <div className="mb-6  w-1/3">
                        <label
                            htmlFor="zipCode"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Zip code
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="  Zip code"
                            required
                            defaultValue={user?.addresses?.zipCode}
                        />
                        </div>


                        {/* <div className=' flex'> */}

                        <div className="mb-6 mx-2 w-1/3">
                            <label
                                htmlFor="street"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                 street
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="street"
                                required
                                defaultValue={user?.addresses?.street}
                            />
                        </div>

                        <div className="mb-6 mx-2 w-1/3">
                            <label
                                htmlFor="building"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                 building
                            </label>
                            <input
                                type="text"
                                id="building"
                                name="building"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="building"
                                required
                                defaultValue={user?.addresses?.building}
                            />
                        </div>

                      

                        {/* </div> */}

                    </div>
                    <div className=' w-full flex items-center justify-around'>
                    <div className="mb-6 mx-2 w-1/2">
                            <label
                                htmlFor="floor"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                 floor
                            </label>
                            <input
                                type="text"
                                id="floor"
                                name="floor"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="floor"
                                required
                                defaultValue={user?.addresses?.floor}
                            />
                        </div>

                        <div className="mb-6 mx-2 w-1/2">
                            <label
                                htmlFor="apartment"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                 apartment
                            </label>
                            <input
                                type="text"
                                id="apartment"
                                name="apartment"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="apartment"
                                required
                                defaultValue={user?.addresses?.apartment}
                            />
                        </div>
                    </div>


                    {/* city and country */}
                    <div className=' flex w-full'>

                        <div className='w-1/2 m-1'>
                            <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                city
                            </label>
                            <select
                                defaultValue={user?.addresses?.city}
                                id="city"
                                name='city'
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="el hegaz">el hegaz</option>
                                <option value="ain shams">ain shams</option>
                                <option value="matarya" className=''>matarya</option>
                            </select>
                        </div>



                        <div className=' w-1/2 m-1'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Country
                            </label>
                            <select
                                name='country'
                                defaultValue={user?.addresses?.country}
                                id="countries"
                                className="bg-gray-50 outline-none border-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="Egypt">Egypt</option>
                            </select>
                        </div>


                    </div>


                </div>


                <div className=' w-full  p-1 flex items-center justify-between'>
                    Allow access to account from multiple places
                    {/* <input type="checkbox" className=' w-6 h-6 ml-2' /> */}


                    <Switch
                        checked={enabled}
                        onChange={setenabled}
                        className={`${enabled ? 'bg-teal-500' : 'bg-teal-800'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${enabled ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>

            </div>
            {/* theme */}
            <div className=' w-[99%] mx-auto  p-3 flex-row flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>




                <RadioGroup className=' w-full   flex items-center justify-center' defaultValue={theme} onChange={(e) => {
                    dispatch(setTheme(e))
                    localStorage.setItem('theme', e)
                }}>
                    {/* <RadioGroup.Label className="sr-only "></RadioGroup.Label> */}
                    {/* <div className="space-y-2 w-full  "> */}

                    <RadioGroup.Option
                        value={'light'}
                        className={({ active, checked }) =>
                            ` mx-3 w-1/2  ${active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                : ''
                            }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                            }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium`}
                                            >
                                                light
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={`inline}`}
                                            >
                                                light mode
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    {checked && (
                                        <div className="shrink-0 text-white">
                                            <MdRadioButtonChecked size='24' color='white' />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>


                    <RadioGroup.Option
                        value={'dark'}
                        className={({ active, checked }) =>
                            ` mx-3 w-1/2  ${active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                : ''
                            }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                            }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium`}
                                            >
                                                dark
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={`inline}`}
                                            >
                                                dark mode
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    {checked && (
                                        <div className="shrink-0 text-white">
                                            <MdRadioButtonChecked size='24' color='white' />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>

                    {/* </div> */}
                </RadioGroup>

            </div>

            <div className=' text-center w-[99%] mx-auto p-3 flex-row flex items-center justify-between rounded-md bg-white dark:bg-slate-800 my-2 '>

                <button disabled={isLoading} className=' mx-auto w-[95%] py-2 bg-green-600 hover:bg-green-700 text-white rounded-md' type='submit'>
                    {isLoading ? <BiLoaderAlt className=' mx-auto animate-spin' size='30' /> : 'submit'}
                </button>

            </div>




            {showWarn && <div className="p-4 mb-4 text-center text-sm text-yellow-200 rounded-lg relative bg-yellow-200 dark:bg-slate-800 dark:text-yellow-50" role="alert">
                <span className="font-medium">alert!</span> You did not save the changes
                <div onClick={() => setshowWarn(false)} className=' absolute right-2 text-red-600 text-2xl top-2 hover:bg-slate-200 dark:hover:bg-slate-900 px-2 rounded-md cursor-pointer'>X</div>
            </div>}

        </form>
    )
}

export default Profile