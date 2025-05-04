import React,{useEffect} from "react"
import { Outlet,Navigate } from "react-router"
import axios from "axios"

export default function AuthRequired(props){
  const {isAuthenticated,setIsAuthenticated,setLoading,loading}=props

  // useEffect(()=>{
  //     axios.get('http://localhost:5000/profile/auth/verify')
  //     .then((res)=>{
  //       console.log(res.data)
  //       if(res.data.authenticated){
  //          setIsAuthenticated(true)
  //       }
  //     })
  //     .catch((err)=>{
  //       console.log('auth check failed',err)
  //        setIsAuthenticated(false)
  //     })
  //     .finally(()=>{
  //       setLoading(false)
  //     })
  //   },[])
 console.log(isAuthenticated)
//  if(loading) return <div>loading....</div>
  // if(!isAuthenticated) return <Navigate to="/login"/>
console.log('chirlasss')
    return (
        <>
        <Outlet/>
        </>
    )
}