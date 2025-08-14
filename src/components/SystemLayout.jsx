import React from "react"
import { Outlet, useParams } from "react-router-dom"
// import SideBar from "./SideBar"
import SideBar from "./sideBar"
import TopHeader from "./TopHeader"


export default function SystemLayout(){
  const {param}=useParams()
  console.log(param)
    return (
        <>
{/* flex flex-col flex-grow * */}
         <div className="flex flex-col h-screen">
        <TopHeader  />
       {/* <SideBar  />  */}
        <div className="flex h-screen gap-x-20">   
           {/* <TopHeader  />  */}
          <div className="fixed left-0 top-30  h-screen w-[13%]"><SideBar/></div>
          <div className="ml-[13%] w-[calc(100%-13%)] h-screen pt-30"><Outlet/></div>

        
        </div>
      </div>
      
     

      
        </>
    )
}