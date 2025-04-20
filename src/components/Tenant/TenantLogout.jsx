import React from "react"
import { useNavigate } from "react-router"
import axios from 'axios'

export default function TenantLogout(){
    const logoutAndLeave=useNavigate('')
    const stayOnSystem=useNavigate('')

   function sure(){
    axios.post('http://localhost:5000/profile/logout', {}, { withCredentials: true })
    .then(() => {
        console.log('Logged out');
        window.location.href = "/";
        logoutAndLeave('/')
    })
    .catch((err) => console.log('Logout error:', err));
   }

   function notNow(){
      stayOnSystem('/role/tenant')
   }
    return (
        <>
        <div className="flex flex-col items-center mt-40">
            <h1 className="text-2xl italic font-bold">Are you sure want to logout?</h1>
        <div className="mt-7 flex gap-x-11">
            <button className="border-2 border-white px-5 py-2 rounded-lg cursor-pointer bg-green-500 text-white text-2xl italic font-semibold hover:bg-green-600 transition ease-in active:scale-110" onClick={sure}>Sure</button>
            <button className="border-2 border-white px-5 py-2 rounded-lg cursor-pointer bg-red-500 text-white text-2xl italic font-semibold hover:bg-red-600 transition ease-in active:scale-110" onClick={notNow}>Not Now</button>
        </div>
        </div>
        </>
    )  // "active:scale-95 transition transform"
}