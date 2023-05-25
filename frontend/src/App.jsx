import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from './store/authSlice'
import Header from './components/Header'
import Loader from './components/Loader'
import Dashboard from './pages/Dashboard'
import VerfiyEmail from './pages/VerfiyEmail'
import './App.css'
import Charts from './components/dashboard_components/Charts'
import Form from './components/dashboard_components/Form'
import Products from './components/dashboard_components/Products'
import Product from './pages/Product'
import ModifyShop from './components/dashboard_components/ModifyShop'
import Errorr404 from './pages/Errorr404'
import Profile from './pages/Profile'



function App() {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(s => s.Auth)



  useEffect(() => {
    dispatch(checkLoggedIn())

  }, []);




  const CheckAuth = ({ children }) => {


    if (user == null) {
      return <Navigate to='/login' />
    } else {
      return children
    }


  }

  const CheckAdmin = ({ children }) => {
    if (user != null) {
      if (user.role === 'admin') {
        return children
      } else {
        return <Navigate to='/err' />
      }
    } else {
      return <Navigate to='/login' />
    }


  }
  const CheckNotAuth = ({ children }) => {
    if (user != null) {
      return <Navigate to='/' />
    } else {
      return (children)
    }
  }




  return (
    <div className='dark'>

      <div className=" min-h-screen dark:text-white dark:bg-gray-900 bg-[#eee]">
        <BrowserRouter>
          <Header />
          {isLoading && <Loader />}
          <Routes>

            <Route path='/' element={<CheckAuth><Home /></CheckAuth>} />

            <Route path='/profile' element={<CheckAuth><Profile /></CheckAuth>} />

            {/* <Route path='dashboard' element={<Dashboard />} > */}
            <Route path='dashboard' element={<CheckAdmin><Dashboard /></CheckAdmin>} >

              <Route path='statistics' element={<Charts />} />

              <Route path='create-product' element={<Form />} />

              <Route path='products' element={<Products />} />


              <Route path='Modify-shop' element={<ModifyShop />} />


            </Route>

            <Route path='/product/:id' element={<Product />} />

            <Route path='/login' element={<CheckNotAuth><SignIn /></CheckNotAuth>} />
            <Route path='/register' element={<CheckNotAuth><Register /></CheckNotAuth>} />
            <Route path='/users/:userId/verfiy/:token' element={<CheckNotAuth><VerfiyEmail /></CheckNotAuth>} />
            <Route path='/*' element={<Errorr404 />} />




          </Routes>
        </BrowserRouter>
      </div>

    </div>
  )
}

export default App