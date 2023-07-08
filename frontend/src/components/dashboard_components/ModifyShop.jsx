import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi'
import { editSite, getAdmins } from '../../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import AminsList from './AminsList';

const ModifyShop = () => {
  const [image, setimage] = useState();
  const [deliverycoast, setdeliverycoast] = useState();
  const dispatch = useDispatch()
  const { dbData, isLoading,admins } = useSelector(s => s.Dashboard)
  const convertTo64Base = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage(reader.result)
      console.log(reader.result)
    }

  }

  const saveChanges = () => {
    dispatch(editSite({
      deliverycoast: parseInt(deliverycoast),
      banner: image
    }))

  }


  useEffect(() => {
    dispatch(getAdmins())

  }, [])

  



  return (
    <div className=' mt-10 text-center'>

      <div className=' flex items-center my-10 px-5 justify-center w-full'>
        <div className=' w-full h-[1px] bg-slate-600 ' />
        <div className=' text-3xl font-extrabold min-w-[210px] text-center '>
          Modify Shop
        </div>
        <div className=' w-full h-[1px] bg-slate-600 ' />
      </div>
      <div className=' text-xl ml-10 mb-2'>Banner</div>

      <div className=' w-[95%] relative rounded-xl max-w-[1200px] min-h-fit flex items-center justify-center mx-auto bg-red-400 object-cover overflow-hidden'>
        <div className=' flex items-center justify-center text-white absolute w-full h-full bg-black/70 opacity-0 hover:opacity-100 transition-all'>
          <label htmlFor="image">
            <FiEdit size={40} className=' cursor-pointer' />
          </label>
          <input type="file" onChange={(e) => convertTo64Base(e.target.files[0])} className=' hidden' id='image' accept='image/*' />
        </div>
        <img src={dbData?.banner} className=' w-full' alt="" />
        {/* "https://www.forevernew.com.au/media/wysiwyg/Sale-CategoryBanner-750x180-MB_13.png" */}
      </div>

      <div className=' text-xl ml-10 my-2'>Delivery coast</div>
      <div className=' w-full flex items-center justify-center'>
        <input defaultValue={dbData?.deliverycoast} id='name' onChange={e => setdeliverycoast(e.target.value)} className="inpt w-[95%] max-w-sm " type="number" />

      </div>


      <div className=' w-full text-center mt-6'>
        <button onClick={saveChanges} disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center  max-w-2xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5 w-full">
          {isLoading ? <AiOutlineLoading3Quarters size='25' className=' mx-auto animate-spin text-white' /> : 'Save changes'}
        </button>
      </div>



      <div className=' flex items-center my-10 px-5 justify-center w-full'>
        <div className=' w-full h-[1px] bg-slate-600 ' />
        <div className=' text-3xl font-extrabold min-w-[240px] text-center '>
          Manage Admins
        </div>
        <div className=' w-full h-[1px] bg-slate-600 ' />
      </div>


      <AminsList admins={admins} isLoading={isLoading} />


    </div >
  )
}

export default ModifyShop