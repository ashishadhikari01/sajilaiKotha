import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
// import { clickedContext } from "../../App";

export default function SideBar() {
  const param = useParams();
  //   console.log(param)
  const { role } = useParams();
  console.log(role);
  //   const { isClicked, setIsClicked } = useContext(clickedContext);
  return (
    <>
      <div className="flex flex-col border-r-3 border-gray-400 w-[13%]  bg-stone-200 h-screen flex-shrink-0 flex-grow-0 fixed left-0 top-30">
        <div className="flex flex-col justify-center w-full h-25">
          <p className="text-2xl font-bold text-center">Sajilai Kotha</p>
        </div>

        <div className="flex flex-col pt-2 mx-auto w-[90%] gap-y-5">
              <Link
                to={
                  (role === "tenant" && `/role/${role}`) ||
                  (role === "landlord" && `/role/${role}/dashboard`)
                }
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                {role === "tenant" && "Home"}
                {role === "landlord" && "Dashboard"}
              </Link>

              <Link
                to={
                  (role === "tenant" && `/role/${role}/watchlist`) ||
                  (role === "landlord" && `/role/${role}/listing`)
                }
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                {role === "tenant" && "watchlist"}
                {role === "landlord" && "Listing"}
              </Link>

              
              <Link
                  to={
                     (role==='tenant' && `/role/${role}/account`) ||
                     (role==='landlord' && `/role/${role}/account`)
                  }
                  className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
                >
                  {role==='tenant' && 'Account'}
                  {role==='landlord' && 'Account'}
                </Link>
              

              
                <Link
                  to={
                     (role==='tenant' && `/role/${role}/logout`) ||
                     (role==='landlord' && `/role/${role}/logout`)
                  }
                  className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
                >
                  {role==='tenant' && 'Logout'}
                  {role==='landlord' && 'Logout'}
                </Link>
              
        </div>
      </div>
    </>
  );
}
