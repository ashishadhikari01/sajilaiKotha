import React, { useEffect, useRef, useState,} from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";

export default function LandlordDashboard() {
  const [photos, setPhotos] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const fileUploadRef = useRef();
  const [userFeedback, setUserFeedback] = useState("");
  const [sucessFeedback, setSucessFeedback]=useState(false)
  const navigateToList=useNavigate('')
  const mapRef = useRef(null);
  console.log(photos);

  function handleImageFilter(imageIndex) {
    setPhotos((prev) => prev.filter((photo, index) => index !== imageIndex));
  }

  function handleImageUpload() {
    fileUploadRef.current.click();
  }

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng); // set marker position on click
      },
    });
  }
  console.log(photos);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPhotoUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
    console.log(newPhotoUrls);
  }
  // console.log(newPhotoUrls)

  const [spaceDetail, setSpaceDetail] = React.useState({
    spaceName: "",
    spaceInDetail: "",
    spaceType: "",
    onTapWater: false,
    wifi: false,
    balcony: false,
    petFriendly: false,
    airCondition: false,
    parkingTwoWheeler: false,
    parkingFourWheeler: false,
    spaceRent: "",
    spaceAddress: "",
    spacePhone: "",
    exactPosition: "",
  });

  useEffect(() => {
    if (markerPosition) {
      const formattedLocation = `${markerPosition.lat.toFixed(
        4
      )}, ${markerPosition.lng.toFixed(4)}`;
      setSpaceDetail((prev) => ({
        ...prev,
        exactPosition: formattedLocation,
      }));
    }
  }, [markerPosition]);

  function handleSpaceDetail(event) {
    const { name, value, type, checked } = event.target;
    setSpaceDetail((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  console.log(photos);
  console.log({ spaceDetail, photos });

  function publishSpace(e) {
    e.preventDefault();
    const formData = new FormData();
    photos.forEach((photoFile) => {
      formData.append("photos", photoFile);
    });
    formData.append("spaceDetail", JSON.stringify(spaceDetail));
    if (markerPosition) formData.append("exactPosition", markerPosition);
    console.log("hera tww", formData);
    if (
      !spaceDetail.spaceName.trim() ||
      !spaceDetail.spaceInDetail.trim() ||
      !spaceDetail.spaceType.trim() ||
      !spaceDetail.spaceRent.trim() ||
      !spaceDetail.spaceAddress.trim() ||
      !spaceDetail.spacePhone.trim() ||
      !(
        spaceDetail.airCondition ||
        spaceDetail.balcony ||
        spaceDetail.onTapWater ||
        spaceDetail.parkingFourWheeler ||
        spaceDetail.parkingTwoWheeler ||
        spaceDetail.petFriendly ||
        spaceDetail.wifi
      )
    ) {
      setUserFeedback("All Field required");
      return;
    } else if (
      isNaN(spaceDetail.spaceRent) ||
      spaceDetail.spaceRent <= 0 ||
      isNaN(spaceDetail.spacePhone) ||
      spaceDetail.spacePhone.length !== 10 ||
      photos.length !== 4
    ) {
      setUserFeedback("Invalid credentials");
      return;
    } else {
      setUserFeedback("");
    }
    //  if(!spaceDetail.spaceName.trim() || !spaceDetail.spaceInDetail.trim() ||
    // !spaceDetail.spaceType.trim() || !spaceDetail.spaceRent.trim() || !spaceDetail.spaceAddress.trim() || !spaceDetail.spacePhone.trim()){
    //   setUserFeedback('All Field reqq')
    //   return
    //  }
    axios
      .post("http://localhost:5000/uploadspace", formData)
      .then((res)=>{
        setSucessFeedback(!sucessFeedback)
        setUserFeedback('Space Uploaded Sucessfully, Redirecting....')
        setTimeout(()=>{
          navigateToList('/role/landlord/listing')
        },2000)
        console.log('On then',res)
      })
      .then((res) => console.log(" on then", res))
      .catch((err) => console.log("error on uploading img", err));
  }
  // console.log(spaceDetail);
  return (
    <>
      <div className="bg-slate-50 overflow-auto">
        {/* <div className="flex justify-center border-3 border-gray-500 w-[70%] mx-auto mt-5 mb-5 bg-slate-50 rounded-xl"> */}
        <form>
          <div className="flex flex-row gap-x-10  gap-y-4 flex-wrap border-gray-500 w-[90%] mx-auto mt-5 mb-5 bg-slate-50 rounded-xl pl-30">
            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold">Rental Space Title:</h1>
              <input
                type="text"
                value={spaceDetail.spaceName}
                name="spaceName"
                onChange={handleSpaceDetail}
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl"
              />
            </div>

            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold">Address:</h1>
              <input
                type="text"
                name="spaceAddress"
                value={spaceDetail.spaceAddress}
                onChange={handleSpaceDetail}
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl"
              />
            </div>

            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold">InDetail Description:</h1>
              <textarea
                rows={8}
                cols={10}
                name="spaceInDetail"
                value={spaceDetail.spaceInDetail}
                onChange={handleSpaceDetail}
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl"
              />
            </div>

            {/* amenities starts heree below div */}

            <div className="mb-4 flex flex-col gap-y-1 w-[40%]">
              <h1 className="text-xl font-semibold mb-1">Amenities:</h1>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="on-tap-water"
                  name="onTapWater"
                  checked={spaceDetail.onTapWater}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="on-tap-water">On-tap Water</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  checked={spaceDetail.wifi}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="wifi">Wifi</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="balcony"
                  name="balcony"
                  checked={spaceDetail.balcony}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="balcony">Balcony</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="pet-fiendly"
                  name="petFriendly"
                  checked={spaceDetail.petFriendly}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="pet-friendly">Pet Friendly</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="air-conditon"
                  name="airCondition"
                  checked={spaceDetail.airCondition}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="air-condition">Air Condition</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="parking-two-wheeler"
                  name="parkingTwoWheeler"
                  checked={spaceDetail.parkingTwoWheeler}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="parking-two-wheeler">Parking Two-Wheeler</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="checkbox"
                  id="parking-four-wheeler"
                  name="parkingFourWheeler"
                  checked={spaceDetail.parkingFourWheeler}
                  onChange={handleSpaceDetail}
                  className="scale-200"
                />
                <label htmlFor="parking-four-wheeler">
                  Parking Four-Wheeler
                </label>
              </div>
            </div>

            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold">Rent:</h1>
              <input
                type="text"
                name="spaceRent"
                value={spaceDetail.spaceRent}
                onChange={handleSpaceDetail}
                placeholder="In NPR"
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl"
              />
            </div>

            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold">Phone Number:</h1>
              <input
                type="text"
                name="spacePhone"
                value={spaceDetail.spacePhone}
                onChange={handleSpaceDetail}
                placeholder="Digits must be 10"
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1 w-[40%]">
              <h1 className="text-xl font-semibold mb-1">Available Space:</h1>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="radio"
                  id="house"
                  name="spaceType"
                  value="house"
                  checked={spaceDetail.spaceType === "house"}
                  className="scale-200"
                  onChange={handleSpaceDetail}
                />
                <label htmlFor="house">House</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="radio"
                  id="flat"
                  value="flat"
                  name="spaceType"
                  checked={spaceDetail.spaceType === "flat"}
                  className="scale-200"
                  onChange={handleSpaceDetail}
                />
                <label htmlFor="flat">Flat</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="radio"
                  id="single-room"
                  value="single room"
                  name="spaceType"
                  checked={spaceDetail.spaceType === "single room"}
                  className="scale-200"
                  onChange={handleSpaceDetail}
                />
                <label htmlFor="single-room">Single Room</label>
              </div>

              <div className="flex gap-x-3 text-lg">
                <input
                  type="radio"
                  id="double-room"
                  value="double room"
                  name="spaceType"
                  checked={spaceDetail.spaceType === "double room"}
                  className="scale-200"
                  onChange={handleSpaceDetail}
                />
                <lable htmlFor="double-room">Double Room</lable>
              </div>
            </div>
            <div className="mb-4 w-[40%]">
              <h1 className="text-xl font-semibold w-[40%]">Photos:</h1>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl cursor-pointer hidden"
                ref={fileUploadRef}
              />
              <input
                readOnly
                type="text"
                className="border-3 border-gray-400 w-[90%] p-2 mt-2 rounded-xl cursor-pointer outline-none"
                placeholder="Not less or more than 4 photos"
                onClick={handleImageUpload}
              />
            </div>
          </div>

          <div className="mx-auto w-[80%] mb-10">
            <div className="text-xl font-semibold w-[40%]">
              <h1 className="mb-4 w-[40%]">Exact Location:</h1>
              {/* <p>{markerPosition}</p> */}
              {/* <div 
             className="w-[250%] h-100 border-3 border-gray-400 rounded-xl" 
             ref={mapRef}>

             </div> */}
              <MapContainer
                center={[27.7172, 85.324]}
                zoom={13}
                // className="w-[250%] h-[500px] border-3 border-gray-400 rounded-xl"
                style={{
                  width: "250%",
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
                <MapClickHandler setMarkerPosition={setMarkerPosition} />
                {markerPosition && <Marker position={markerPosition} />}
              </MapContainer>
            </div>
            <input
              name="exactPosition"
              readOnly
              type="text"
              className="text-lg font-semibold w-[30%] p-2 mt-2 rounded-xl bg-gray-300 outline-none border border-red-500"
              placeholder="No location marked"
              value={spaceDetail.exactPosition}
            />
            <p className="text-xl font-semibold mt-2 italic bg-stone-300 p-1 rounded-lg">Add with caution,exact location cannot be updated later</p>
          </div>

          {/* <div className="w-[40%] mx-[10%]">
            <p>error:</p>
          </div> */}
          <div className="mb-8 w-[40%] mx-[10%]">
            <p className={`mb-1 text-xl ml-1 font-semibold italic ${sucessFeedback? 'text-green-500': 'text-red-500'}`}>{userFeedback}</p>
            <button
              className="border border-green-500 px-6.5 py-1.5 bg-green-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in"
              onClick={publishSpace}
            >
              Publish Space
            </button>
          </div>
        </form>

        {/* <form> */}
        <div className="flex flex-wrap w-[80%] mx-auto mb-4 gap-x-5 gap-y-10 pl-10">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Preview ${index + 1}`}
                className="w-130 h-auto object-contain border-3 border-gray-400 rounded-xl"
              />
              <button
                onClick={() => handleImageFilter(index)}
                className="absolute top-2 right-2 bg-red-500 text-white text-md rounded-lg p-1 cursor-pointer italic hover:scale-103 active:scale-97"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* </form> */}
      </div>
    </>
  );
}
