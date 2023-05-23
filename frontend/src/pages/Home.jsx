import React, { useEffect } from 'react'
import { getSiteData } from '../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch()
  const { dbData } = useSelector(s => s.Dashboard)
  useEffect(() => {
    dispatch(getSiteData())
  }, []);
  
  return (
    <div>
      <div className=' my-10 w-[95%] relative rounded-xl max-w-[1200px] min-h-fit flex items-center justify-center mx-auto bg-red-400 object-cover overflow-hidden'>
        <img src={dbData?.banner} className=' w-full' alt="" />

      </div>




    </div>
  )
}

export default Home