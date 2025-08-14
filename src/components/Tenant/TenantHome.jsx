import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopHeader from "../TopHeader";

export default function TenantHome() {
  const [spaces, setSpaces] = useState(null);
  const [currentIndexes, setCurrentIndexes] = useState([]);
  // holds current image index for each space
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allspaces")
      .then((res) => {
        setSpaces(res.data);
        setCurrentIndexes(new Array(res.data.length).fill(0)); // initialize index 0 for each space
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(spaces);
  // Auto-slide every 3 seconds
  // useEffect(() => {
  //   if (!spaces || isHovered) return;
  //   const interval = setInterval(() => {
  //     setCurrentIndexes((prevIndexes) =>
  //       prevIndexes.map((index, i) =>
  //         spaces[i]?.photos?.length
  //           ? (index + 1) % spaces[i].photos.length
  //           : 0
  //       )
  //     );
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [spaces, isHovered]);

  const handleNext = (spaceIndex) => {
    setCurrentIndexes((prev) =>
      prev.map((idx, i) =>
        i === spaceIndex ? (idx + 1) % spaces[i].photos.length : idx
      )
    );
  };

  const handlePrev = (spaceIndex) => {
    setCurrentIndexes((prev) =>
      prev.map((idx, i) =>
        i === spaceIndex
          ? (idx - 1 + spaces[i].photos.length) % spaces[i].photos.length
          : idx
      )
    );
  };
  const role = {
    tenant: "tenant",
    landlord: "landlord",
  };
  const [addToWatchlist, setAddToWatchlist] = useState({});
  const [watchlistStatus, setWatchlistStatus] = useState(() => {
    const saved = localStorage.getItem("watchlistStatus");
    if (!saved || saved === "undefined") return {};
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  });

  function addWatchList(spaceInfo) {
    let { spaceId, userId, spaceIndex } = spaceInfo;
    setWatchlistStatus((prev) => ({
      ...prev,
      [spaceIndex]: !prev[spaceIndex], // toggle only the clicked one
    }));
    setAddToWatchlist({ userId, spaceId });
  }
  console.log(watchlistStatus);
  console.log(addToWatchlist);

  console.log(spaces);

  useEffect(() => {
    if (Object.keys(addToWatchlist).length === 0) return;
    axios
      .post("http://localhost:5000/watchlist", addToWatchlist)
      .then((res) => console.log("on then", res))
      .catch((err) => console.log("on catch", err));
  }, [addToWatchlist]);

  useEffect(() => {
    localStorage.setItem("watchlistStatus", JSON.stringify(watchlistStatus));
  }, [watchlistStatus]);

  const [filterdialog, setFilterDialog] = useState(false);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [filterFeedback,setFilterFeedback]=useState(false)
  function filterSpace() {
    setFilterDialog(!filterdialog);
  }
  const [location, setLocation] = useState("");

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation(`${lat}, ${lon}`);
        },
        (error) => {
          console.error("Error getting location:", error.code, error.message);
          alert("Unable to retrieve your location.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  let [userChooseFilter, setUserChoose] = useState({
    spacetype: "",
    pricerange: "",
  });
  function handleFilter(event) {
    const {name,type,checked,value}=event.target
    setUserChoose((prev)=>{
      return {
        ...prev,
         [name]:type==='checkbox'? checked:value
      }
    })
  }
  console.log(userChooseFilter)

function submitFilter() {
  setTimeout(() => {
    setFilterDialog(prev => !prev);
  },1000);

  const obtainedSpaces = spaces.filter(item => {
    const matchType = item.spacetype === userChooseFilter.spacetype;
    let matchPrice = false;

    if (userChooseFilter.pricerange === 'less than 6k') {
      matchPrice = item.rent < 6000;
    } else if (userChooseFilter.pricerange === 'between 6k & 10k') {
      matchPrice = item.rent >= 6000 && item.rent < 10000;
    } else if (userChooseFilter.pricerange === 'between 10k & 15k') {
      matchPrice = item.rent >= 10000 && item.rent < 15000;
    } else if (userChooseFilter.pricerange === 'more than 15k') {
      matchPrice = item.rent >= 15000;
    }

    return matchType && matchPrice
  });
  // console.log(obtainedSpaces);
  setFilteredSpaces(obtainedSpaces);

  if(obtainedSpaces.length===0){
    setFilterFeedback(true)
    setTimeout(()=>{
  setFilterFeedback(false)
    },700)
  }

}
  function resetFilter(){
    setFilteredSpaces('')
    setUserChoose(()=>{
      return {
        spacetype:"",
        pricerange:""
      }
    })
  }
//  console.log(filteredSpaces)
  if (!spaces) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-row w-full p-3 items-center  z-[1] sticky top-30 bg-white">
        <div
          className="flex flex-wrap gap-x-2 p-2 border-2 border-gray-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-200 hover:border-2 hover:border-gray-500 ml-7"
          onClick={filterSpace}
        >
          <img src="/icons8-filter-100.png" width={25} height={25} />
          <p className="text-lg">Filters</p>
        </div>

        <div className="flex justify-center flex-1">
          <input
            type="text"
            placeholder="Search For Location"
            className="border w-110 h-10 p-5 rounded-lg bg-white border-3 border-gray-400  focus:border-gray-900 outline-none"
          />
        </div>
      </div>

      {filterdialog && (
        <div className="fixed top-20 left-80 transform -translate-x-1/2 z-[999] cursor-pointer">
          <div className="bg-white rounded-xl p-6 shadow-lg w-100 h-100 border border-gray-300 overflow-auto">
            <div className="mb-4">
              <h2 className="font-bold text-xl">Space Type</h2>
              <div className="flex flex-wrap gap-x-3 mt-1">
                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="singleroom"
                    name="spacetype"
                    value='single room'
                    onChange={handleFilter}
                    className="scale-150"
                    checked={userChooseFilter.spacetype==='single room'}
                  />
                  <label htmlFor="singleroom">SingleRoom</label>
                </div>

                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="doubleroom"
                    name="spacetype"
                    onChange={handleFilter}
                    className="scale-150"
                    value='double room'
                    checked={userChooseFilter.spacetype==='double room'}
                  />
                  <label htmlFor="doubleroom">DoubleRoom</label>
                </div>

                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="flat"
                    name="spacetype"
                    onChange={handleFilter}
                    className="scale-150"
                    value='flat'
                    checked={userChooseFilter.spacetype==='flat'}
                  />
                  <label htmlFor="flat">Flat</label>
                </div>

                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="house"
                    name="spacetype"
                    onChange={handleFilter}
                    className="scale-150"
                    value='house'
                    checked={userChooseFilter.spacetype==='house'}
                  />
                  <label htmlFor="house">House</label>
                </div>
              </div>
            </div>
            {/* -----------filter based on rent range------------ */}
            <div className="mb-6">
              <h2 className="font-bold text-xl">Price Range</h2>
              <div className="flex flex-wrap gap-x-3 mt-1">
                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="lessthan6k"
                    name="pricerange"
                    className="scale-150"
                    onChange={handleFilter}
                    value='less than 6k'
                    checked={userChooseFilter.pricerange==='less than 6k'}
                  />
                  <lable htmlFor="lessthan6k">Less than 6k</lable>
                </div>

                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="between6k10k"
                    name="pricerange"
                    className="scale-150"
                    onChange={handleFilter}
                    value="between 6k & 10k"
                    checked={userChooseFilter.pricerange==='between 6k & 10k'}
                  />
                  <lable htmlFor="between6k10k">Between 6k & 10k</lable>
                </div>

                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="between10k15k"
                    name="pricerange"
                    className="scale-150"
                    onChange={handleFilter}
                    value="between 10k & 15k"
                    checked={userChooseFilter.pricerange==='between 10k & 15k'}
                  />
                  <lable htmlFor="between10k15k">Between 10k & 15k</lable>
                </div>
 
                <div className="text-lg italic font-semibold flex gap-x-2 p-1">
                  <input
                    type="radio"
                    id="more15k"
                    name="pricerange"
                    className="scale-150"
                    onChange={handleFilter}
                    value="more than 15k"
                    checked={userChooseFilter.pricerange==='more than 15k'}
                  />
                  <lable htmlFor="more15k">More than 15k</lable>
                </div>


              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Advance nearby search</h2>

            <input
              type="text"
              value={location}
              readOnly
              placeholder="Location will appear here"
              className="border w-full p-2 rounded-lg bg-gray-100 cursor-not-allowed"
            />

            <button
              onClick={handleLocationAccess}
              className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Allow Location Access
            </button>
          
          <p className="text-lg italic">{filterFeedback? 'No space available under filter condition':''}</p>
            <button 
            onClick={submitFilter}
            className="mt-3 w-full bg-green-400 p-2 rounded-lg hover:bg-green-500 text-white cursor-pointer"
            >Submit Filter</button>

            <button 
            onClick={resetFilter}
            className="mt-3 w-full bg-red-400 p-2 rounded-lg hover:bg-red-500 text-white cursor-pointer"
            >Reset Filter</button>

            <button
              onClick={() => setFilterDialog(!filterdialog)}
              className="mt-3 w-full bg-gray-300 p-2 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 w-full mt-5 mb-5 pl-6">
        {(filteredSpaces.length>0? filteredSpaces:spaces)?.map((space, spaceIndex) => {
          const photos = space.photos;
          const currentPhotoIndex = currentIndexes[spaceIndex] || 0;
          return (
            <div
              className="bg-slate-300 w-110 h-auto relative overflow-hidden shadow-[1px_1px_4px_1px_rgba(0,0,0,0.5)] rounded-lg cursor-pointer  hover:scale-102 transition-all ease-out duration-500 hover:shadow-[1px_1px_6px_1px_rgba(0,0,0,0.9)]"
              key={spaceIndex}
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
            >
              {photos && photos.length > 0 && (
                <img
                  src={`http://localhost:5000${photos[currentPhotoIndex]}`}
                  alt="space"
                  className="object-content w-130 h-60 rounded-lg"
                />
              )}
              <button
                onClick={() => handlePrev(spaceIndex)}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full cursor-pointer"
              >
                ‹
              </button>
              <button
                onClick={() => handleNext(spaceIndex)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full cursor-pointer"
              >
                ›
              </button>

              <div className="p-2">
                <div
                  className="flex justify-end"
                  onClick={() => {
                    if (!watchlistStatus[spaceIndex]) {
                      addWatchList({
                        spaceId: spaces[spaceIndex]._id,
                        userId: spaces[spaceIndex].userid,
                        spaceIndex,
                      });
                    }
                  }}
                  style={{
                    cursor: watchlistStatus[spaceIndex] ? "default" : "pointer",
                  }}
                >
                  <img
                    src={
                      watchlistStatus[spaceIndex]
                        ? "/icons8-heart-fill-96.png"
                        : " /icons8-heart-96.png"
                    }
                    width={35}
                    height={35}
                    alt="add to watchlist"
                  />
                </div>
                <Link
                  to={`/role/${role.tenant}/${space._id}`}
                  state={{ index: spaceIndex }}
                >
                  <div>
                    <p className="text-lg font-semibold italic">
                      {space.spacename}
                    </p>
                    <div className="flex  items-center justify-between w-[99%]">
                      <p className="text-2xl font-semibold italic hover:text-red-600">
                        Rs.
                        <span className="italic text-lg font-semibold">
                          {space.rent} monthly
                        </span>
                      </p>
                      <p className="text-xl font-semibold italic">
                        {space.spacetype}
                      </p>
                    </div>
                    <p className="text-xl font-semibold">{space.address}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
