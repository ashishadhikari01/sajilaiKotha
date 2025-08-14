import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function TopHeader(props) {
  const navigate = useNavigate();
  let { role } = useParams();
  // console.log(parameter)
  // let { parameter.role } = useParams();
  // console.log('yehaaa mujii',parameter)

  // console.log(parameter.role);
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState("");
  const [spacedetail, setSpaceDetail] = useState([]);
  const [spaceType, setSpaceType] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/allspaces")
      .then((res) => {
        setSpaceDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (spacedetail && spacedetail.length > 0) {
    spacedetail.forEach((space, item) => {});
  }

  console.log(spacedetail);

  function filterClick() {
    setShowPopup(true);
  }
  // console.log(detail)
  function handleLocationAccess() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding with a free API (OpenStreetMap)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setLocation(data.display_name || `${latitude}, ${longitude}`);
          } catch (err) {
            console.error("Error fetching location:", err);
            setLocation(`${latitude}, ${longitude}`);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <>
      <div className="flex items-center w-[100%] h-30 fixed top-0 right-0 bg-stone-200 border-b-3 border-gray-400 min-h-30 max-h-30 flex-wrap z-100 ">
        <div className="flex justify-between items-center mx-auto w-[95%]">
          <div>
            <h1 className="text-2xl font-bold text-center">Sajilai Kotha</h1>
          </div>

          <div className="flex gap-x-5 text-xl">
            <Link to={`/role/tenant`}>
              <button className="p-2 rounded-xl border-2 border-gray-400 bg-zinc-100 hover:border-gray-500 hover:bg-zinc-200">
                Tenant
              </button>
            </Link>

            <Link to={`/role/landlord/dashboard`}>
              <button className="p-2 rounded-xl border-2 border-gray-400 bg-zinc-100 hover:border-gray-500 hover:bg-zinc-200">
                Landlord
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
