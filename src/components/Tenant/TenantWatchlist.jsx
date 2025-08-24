import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function TenantHome() {
  const [watchlistSpace, setWatchlistSpaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/watchlistspace")
      .then((res) => setWatchlistSpaces(res.data))
      .catch(console.log);
  }, []);
  console.log(watchlistSpace);
  console.log()

  // let
  return (
    <>
      {/* <div>
        {
        watchlistSpace.length>0?
         (
          watchlistSpace.map((item, index) => (
          <Link
            key={index}
            to={`http://localhost:5173/role/tenant/${item.spaceId}`}
            // http://localhost:5173/role/tenant/68903646ee8f1d19e0323102
            className="block p-5 bg-stone-200 m-3 cursor-pointer"
          >
            <p className="text-2xl font-semibold">Space {index+1}</p>
            {/* <P>Id:{item?.spaceId}</P> */}
      {/* {`Space ${index} ${item?.spaceId}`} *
          </Link>
        ))
         ):(<h1 className="text-xl ml-2 font-semibold">Nothing to show</h1>)
        
        }
      </div> */}

      <div>
        {watchlistSpace.length > 0 ? (
          watchlistSpace.map((item, index) => {
            return (
              <div className="flex justify-between items-center block p-10 bg-neutral-100 mt-3 w-[100%]">
                <div>
                  <p className="text-xl font-semibold italic">
                    SpaceId: {item.spaceId}
                  </p>
                  <p className="text-xl font-semibold italic">
                    Location: {item?.spaceDetail?.address}
                  </p>
                  <p className="text-xl font-semibold italic">
                    Price: {item.spaceDetail?.rent}
                  </p>
                </div>

                <div>
                  <Link
                    to={`http://localhost:5173/role/tenant/${item.spaceId}`}
                    className="p-2 border-3 border-black-500 rounded-2xl text-xl bg-neutral-100 
                hover:bg-neutral-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          // <div>

          // </div>
          <h1 className="text-xl ml-2 font-semibold">Nothing to show</h1>
        )}
      </div>
    </>
  );
}
