import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import TopHeader from "../TopHeader";
// import verifyToken from "../../../backend/middleware/authMiddleWare";

export default function TenantSpaceDetail() {
  const [detail, setDetail] = useState([]);
  const { space_id } = useParams();
  const [userid,setUserId]=useState('')
  const [watchlistFeedback, setWatchlistFeedback] = useState("")
  const [watchlistAddFeedback, setWachlistAddFeedback]=useState("")
  const location = useLocation();
  // console.log(location.state.index)
  let backToHome = useNavigate();
  console.log(space_id);
  
  useEffect(()=>{ 
    axios
      .get("http://localhost:5000/profile")
      .then((res) => {
        setUserId(res.data._id);
      })
      .catch((err) => console.log(err));
  },[])

  useEffect(() => { 
    axios
      .get("http://localhost:5000/tenantspecificspace", {
        params: { space_id },
      })
      .then((res) => {
        setDetail(res.data.space);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [])

  console.log(detail);
  let storeAmenities = [];
  for (let amenity in detail[0]?.amenities) {
    if (detail[0]?.amenities[amenity]) {
      storeAmenities.push(amenity);
    }
  }

  const [markerPosition, setMarkerPosition] = useState(null);
  useEffect(() => {
    if (detail[0]?.exactPosition) {
      const [lat, lng] = detail[0].exactPosition.split(",").map(Number);
      setMarkerPosition([lat, lng]);
    }
  }, [detail[0]?.exactPosition]);

  useEffect(() => {
    if (!watchlistFeedback) return;
    setTimeout(() => {
      setWatchlistFeedback("");
    },1000);

    // let watchlistStatus =
    //   JSON.parse(localStorage.getItem("watchlistStatus")) || {};

    // watchlistStatus[location.state?.index] = false;

    // localStorage.setItem("watchlistStatus", JSON.stringify(watchlistStatus));
  }, [watchlistFeedback]);

  useEffect(()=>{
    if(!watchlistAddFeedback) return
    setTimeout(()=>{
      setWachlistAddFeedback("")
    },1000)
  },[watchlistAddFeedback])

  function backBtn() {
    backToHome("/role/tenant");
  }

  function deleteFromWatchlist() {
    console.log('clcikk')
    axios
      .delete("http://localhost:5000/watchlistdelete", { data: { space_id:space_id, userid:userid} })
      .then((res) => {
        console.log("on then", res);
        setWatchlistFeedback(res.data.message);
      })
      //  .then((res)=>console.log('on then',res))
      .catch((err) => console.log("on catch", err));
  }
  
  console.log(detail)
  function addWatchlist(spaceinfo){
    console.log(spaceinfo)
    // const {spaceId,hostId}=spaceinfo
    axios
      .post("http://localhost:5000/watchlist",spaceinfo)
      .then((res) =>{
        setWachlistAddFeedback(res.data.message)
        console.log("on then", res)
      })
      .catch((err) => console.log("on catch", err));
  }
  console.log(detail)
  if (detail.length < 0) return <p>loading...</p>;
  // console.log(detail);
  // console.log(detail[0]?.spacename);

  return (
    <>
      {/* <TopHeader detail={detail} /> */}
      <div className="">
        <button
          className="ml-3 mt-3 px-5 py-1 border border-gray-300 font-semibold text-xl cursor-pointer bg-stone-100 hover:bg-stone-200 transition duration-400"
          onClick={backBtn}
        >
          Back to home
        </button>
        {detail.length === 0 ? (
          <div className="mt-3 w-[90%] mx-auto text-2xl text-red-500 font-semibold">&#x26A0; Space has been deleted by the host</div>
        ) : (
          <div className="mt-5 mb-5 w-[90%] mx-auto justify-center">
            <div>
              <p className="font-bold text-2xl mb-5">{detail[0]?.spacename}</p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Space Type:</p>
              <p className=" text-lg font-semibold border-3 border-gray-400 w-[50%] p-2 rounded-lg hover:bg-stone-100 cursor-pointer mb-3">
                {detail[0]?.spacetype}
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Address:</p>
              <p className=" text-lg font-semibold border-3 border-gray-400 w-[50%] p-2 rounded-lg hover:bg-stone-100 cursor-pointer mb-3">
                {detail[0]?.address}
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Amenities:</p>
              <div className="flex flex-row">
                {storeAmenities.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="p-2 m-1 rounded-xl text-lg font-semibold bg-stone-200 cursor-pointer mb-3 hover:bg-stone-300 transition duration-500"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">
                Indetail Description:
              </p>
              <p className="whitespace-pre-line flex flex-col  mb-3 text-xl font-semibold border-3 border-gray-400 rounded-lg w-[50%] p-6 cursor-pointer hover:bg-stone-100 transition duration-500">
                {detail[0]?.spacedetail}
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Rent:</p>
              <p className=" text-lg font-semibold border-3 border-gray-400 w-[50%] p-2 rounded-lg hover:bg-stone-100 cursor-pointer mb-3">
                Rs.{detail[0]?.rent}
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Phone:</p>
              <p className=" text-lg font-semibold border-3 border-gray-400 w-[50%] p-2 rounded-lg hover:bg-stone-100 cursor-pointer mb-3">
                {detail[0]?.phonenumber}
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl mb-2">Photos:</p>
              <div className="flex flex-wrap gap-17 w-[100%]">
                {detail[0]?.photos.map((photo, index) => {
                  return (
                    <img
                      key={index}
                      src={`http://localhost:5000${photo}`}
                      className="object-contain w-[45%] h-auto border-3 border-zinc-400 rounded-lg shadow-lg"
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-7">
              <MapContainer
                center={[27.7172, 85.324]}
                zoom={13}
                // className="w-[250%] h-[500px] border-3 border-gray-400 rounded-xl"
                style={{
                  width: "90%",
                  height: "500px",
                  border: "3px solid gray",
                  borderRadius: "1rem",
                }}
              >
                <TileLayer
                  url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=EQmPDs5jm1LKtjv36mle"
                  attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
                  tileSize={512}
                  zoomOffset={-1}
                  minZoom={0}
                  maxZoom={22}
                />
                {markerPosition && <Marker position={markerPosition} />}
              </MapContainer>
            </div>
          </div>
        )}
        <div className="mt-3 w-[90%] mx-auto justify-center">
          <p className="font-semibold italic ml-2 mb-1 text-xl text-gray-600">
            {watchlistFeedback}
          </p>
          <p className="font-semibold italic ml-2 mb-1 text-xl text-gray-600">{watchlistAddFeedback}</p>
        <div className="flex gap-x-5  pb-10">
          {detail.length>0 &&
          <button
            className="px-3 py-2 rounded-lg border-gray-500 bg-gray-300 font-bold text-xl cursor-pointer hover:bg-gray-400 hover:border border-black-500 active:scale-93 transition duration-500"
            onClick={()=>addWatchlist({spaceId:detail[0]._id,hostId:detail[0].userid})}
          >
            I'm Interested
          </button>
          }
{/* addWatchlist */}
          <button
            className="px-3 py-2 rounded-lg border-gray-500 bg-gray-300 font-bold text-xl cursor-pointer hover:bg-gray-400 hover:border border-black-500 active:scale-93 transition duration-500"
            onClick={deleteFromWatchlist}
          >
            No More Interest
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
