import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Loader = () => {
    return (
        <div className=' fixed top-0 left-0 z-50 bottom-0 right-0 bg-black/70 backdrop-blur-xl flex items-center justify-center'>
            
            <span className="loader"></span>

        </div>
    )
}

export default Loader