import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { clickedContext } from "../../App";


export default function SystemHeader() {

  const { isClicked, setIsClicked } = useContext(clickedContext);
  return (
    <>
      <div className="flex flex-col border-r border-gray-400 w-50 bg-stone-200 min-h-screen">
        <div className="flex flex-col justify-center w-full h-25">
          <p className="text-2xl font-bold text-center">Sajilai Kotha</p>
        </div>

        <div className="flex flex-col pt-2 mx-auto w-[90%] gap-y-5">
          {isClicked.tenant ? (
            <>
              <Link
                to="/tenant"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/tenant/watchlist"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Watchlist
              </Link>
              <Link
                to="/tenant/account"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Account
              </Link>
              <Link
                to="/tenant/logout"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/landlord"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Dashboard
              </Link>
              <Link
                to="/landlord/listing"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Listing
              </Link>
              <Link
                to="/landlord/account"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Account
              </Link>
              <Link
                to="/landlord/logout"
                className="font-bold text-lg px-6 py-2 hover:bg-stone-300 rounded-lg"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
