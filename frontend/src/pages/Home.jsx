import React, { useEffect } from 'react'
import { getSiteData } from '../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import HomeProducts from '../components/HomeProducts';
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
      <div className=' hidden sm:flex my-10 w-[95%] relative rounded-xl max-w-[1200px] min-h-fit  items-center justify-center mx-auto bg-red-400 object-cover overflow-hidden'>
        <img crossOrigin="anonymous" src={dbData?.banner} className=' w-full' alt="" />

      </div>



      <div className=' w-full text-center'>

       <HomeProducts />


      </div>


    </div>
  )
}

export default Home