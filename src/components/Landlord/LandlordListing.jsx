import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

export default function LandlordListing() {
  const [listedSpace, setListedSpace] = useState([]);
  const role={
    tenant:"tenant",
    landlord:"landlord"
}
  useEffect(() => {
    axios("http://localhost:5000/getuploadspace")
      .then((res) => {
        setListedSpace(res.data.obtainedSpace);
        console.log(res);
      })
      .catch((err) => console.log("we got error", err));
  }, []);
  console.log("listed space", listedSpace);
  
  function editSpaceDetails(item){
    console.log(item._id)
  }
  return (
    <>
      {listedSpace.length === 0 && <h1 className="font-semibold italic text-2xl">No Spaces have been listed</h1>}

      <div className="flex gap-4 flex-wrap mt-5 mb-5 ">
        {listedSpace.map((item) => {
          return (
            <>
              {/* <div className="flex gap-5"> */}
              <div className="w-full h-auto">
                <div className="flex items-center bg-neutral-100 justify-between w-full h-30 px-3">
                  <div>
                    <p className="text-2xl font-semibold">
                      {item.spacename.slice(0, 30) + "..."}
                    </p>
                    <p className="italic text-xl semi-bold">{`${item.spacetype} at ${item.address}`}</p>
                    <p className="italic text-xl font-semibold">
                      Rent: {item.rent}
                    </p>
                  </div>
                  <Link to={`/role/${role.landlord}/listing/${item._id}`}><button className="border-3 rounded-xl w-20 p-2 bg-white cursor-pointer text-xl transition-all easer-in-out hover:bg-neutral-200 active:bg-white" onClick={()=>editSpaceDetails(item)}>
                    View
                  </button></Link> 
                </div>
              </div>
              {/* </div> */}
            </>
          );
        })}
      </div>
    </>
  );
}
