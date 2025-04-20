import React from "react"
import SideBar from "./sideBar"
import { useParams } from "react-router-dom"
import Layout from "./SystemLayout"

export default function SystemRender(){
    const {role}=useParams()
    console.log(role)
    return (
        <>
        {role==='tenant' && <Layout/> }
        {role==='landlord' && <Layout/> }
        {(role==='account' || role==='logout') && <Layout/>}
        { (role!=='tenant' && role!=='landlord') && <h1>route not matched</h1> }
       
        
        </>
    )
}

// import { useParams } from "react-router-dom";

// export default function SystemRender() {
//   const { role } = useParams();

//   return (
//     <div>
//       <h1>You chose: {role}</h1>
//     </div>
//   );
// }


