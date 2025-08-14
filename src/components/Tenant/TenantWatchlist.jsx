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
  },[]);
console.log(watchlistSpace)

// for(let index in watchlistSpace){
//     console.log(watchlistSpace[index].spaceId)
// }
  return (
    <>
      <h1>hello from tenant watchlist</h1>
      <div>
        {watchlistSpace.map((item, index) => (
          <Link
            key={index}
            to={`http://localhost:5173/role/tenant/${item.spaceId}`}
            // http://localhost:5173/role/tenant/68903646ee8f1d19e0323102
            className="block p-5 bg-stone-200 m-3 cursor-pointer"
          >
            {item?.spaceId}
          </Link>
        ))}
      </div>
    </>
  );
}