// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { register } from '../store/authSlice';

const Register = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error,verfiy_email } = useSelector(e => e.Auth)



  const registerf = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    console.log(data)
    dispatch(register(data))

  }







  return (
    <section className="   w-full mt-20 flex items-center justify-center flex-col">

     {verfiy_email.src == 'register'&& <div className="p-4 mb-4 -mt-9 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
        <span className="font-medium">{verfiy_email.err}</span>
      </div>}


      <div className="w-full  max-w-md bg-white rounded-lg shadow dark:border    dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register new account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={(e) => { registerf(e) }}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-100 border-none outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="john doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 border-none outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-100 border-none outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <span className=' text-red-600 mx-auto mt-2'>{error.src == 'register' && error.err}</span>
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign up
            </button>





          </form>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white dark:bg-slate-800 px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
          </div>

          <button onClick={() => window.open('/api/auth/google', "_self")} className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 duration-150 active:bg-gray-100">

            <FcGoogle size={23} />
            Continue with Google
          </button>



          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </section>
  )
}

export default Register