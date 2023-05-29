import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { verfAcc } from '../store/authSlice'
import Loader from '../components/Loader'

const VerfiyEmail = () => {
    const { error, user, isLoading } = useSelector(s => s.Auth)
    const dispatch = useDispatch()
    const { userId, token } = useParams()

    useEffect(() => {
        dispatch(verfAcc({ userId, token }))
    });


    return (
        <div className=' flex items-center justify-center text-2xl'>
            {isLoading && <Loader />}
            {error.src == 'verfAcc' && error.err}
            {
                user == null ? 'Please wait ' : 'email verified successfully'
            }

        </div>
    )
}

export default VerfiyEmail