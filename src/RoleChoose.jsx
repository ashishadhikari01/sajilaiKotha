import React from "react"
import {Link} from "react-router-dom"

export default function RoleChoose(){
    const role={
         tenant:"tenant",
         landlord:"landlord"
    }
    return (
      <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Choose your role:</h1>
        <div className="flex gap-x-5 mt-7">
            <Link to={`/role/${role.tenant}`}><button className="border p-5 cursor-pointer active:bg-red-400">Tenant</button></Link>
            <Link to={`/role/${role.landlord}`}><button className="border p-5 cursor-pointer active:bg-red-400">Landlord</button></Link>

        </div>
      </div>
      </>
    )
}