import React, { useState, useEffect} from 'react'
import 'animate.css'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleSuccess } from '../utility';
function Home() {

  const [loggedIndUser , setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  } ,[])
  const navigate = useNavigate()
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout')
    setTimeout(() => {
      navigate('/login')
    },1000)
  }
  return (
    <div class = "w-screen min-h-screen bg-purple-950 flex  flex-col items-center justify-center gap-3.5 text-xl md:text-2xl lg:text-3xl" > 
        <h1 class = "animate__animated animate__bounceInDown font-sans font-semibold text-yellow-600 ">Welcome to my website</h1>
        <h2 class = " font-mono  font-semibold text-gray-50 ">{loggedIndUser}</h2>
        <button class = " text-slate-50 bg-amber-800  rounded-lg text-xl  px-0.5 py-0.5 cursor-pointer hover:bg-orange-800" onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>

  )
}

export default Home;
 
      
    
  