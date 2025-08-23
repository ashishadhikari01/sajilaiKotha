import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

export default function PotentialTenant() {
  const [listedSpace, setListedSpace] = useState("");
  const [id, setId] = useState("");
   
    const role = {
    tenant: "tenant",
    landlord: "landlord",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile") 
      .then((res) => {
        setId(res.data._id);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/potentialtenant", {
        params: { id: id },
      })
      .then((res) => {
        console.log(res)
        setListedSpace(res.data.findUser);
      })
      .catch((err) => console.log(err));
  },[id]);
  console.log(listedSpace);
  // useEffect(())
if(listedSpace.length===0){
return <h1 className="text-xl ml-3 italic">Nothing to show</h1>
}
     
  

  return (
    <>
    <div className="w-[90%] mx-auto mt-4">
      <table className="border-4 border-stone-400 w-full border-collapse">
        <thead>
          <th className="border border-stone-400 px-2 py-1 text-2xl">SpaceId</th>
          <th className="border border-stone-400 px-2 py-1 text-2xl">Interested User</th>
          <th className="border border-stone-400 px-2 py-1 text-2xl">Email</th>
        </thead>
        <tbody>
          {listedSpace.length>0 &&
          listedSpace.map((item,index)=>{
            return (
            <tr className="w-[100%] border">
              
              <td className="border border-stone-400 px-2 py-1 text-xl text-center italic">
                <Link to={`/role/${role.tenant}/${item.spaceId}`} className="cursor-pointer hover:font-semibold">{item.spaceId}</Link></td>
              
              <td className="border border-stone-400 px-2 py-1 text-xl text-center italic">{item.userDetail.firstname+" "+ item.userDetail.lastname}</td>
              <td className="border border-stone-400 px-2 py-1 text-xl italic">{item.userDetail.email}</td>
            </tr>
            )
          })
          
          }
        </tbody>
      </table>
    </div>
    
    </>
  );
}
