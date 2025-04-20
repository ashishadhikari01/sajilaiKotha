import React, { useState } from "react";

export default function LandlordDashboard() {
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const fileURLs = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to base64 string
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result); // Resolve with the base64 string
      });
    });

    Promise.all(fileURLs).then((urls) => {
      setPhotos((prevPhotos) => [...prevPhotos, ...urls]); // Add new photo previews
    });
  };

  const [spaceDetail, setSpaceDetail] = React.useState({
    spaceName: "",
    spaceInDetail: "",
    spaceType: "",
    onTapWater:false,
    wifi:false,
    balcony:false,
    petFriendly:false,
    airCondition:false,
    parkingTwoWheeler:false,
    parkingFourWheeler:false,
    spaceRent: "",
    spaceAddress: "",
    spacePhone: "",
  });

  function handleSpaceDetail(event) {
    const {name,value,type,checked}=event.target
    setSpaceDetail((prev) => {
      return {
        ...prev,
        [name]:type==="checkbox"? checked: value
      };
    });
  }
  console.log(spaceDetail);
  return (
    <>
      <div className="bg-slate-50 overflow-auto">
        {/* <div className="flex justify-center border-3 border-gray-500 w-[70%] mx-auto mt-5 mb-5 bg-slate-50 rounded-xl"> */}
        <form className="flex flex-col items-center border-3 border-gray-500 w-[65%] mx-auto mt-5 mb-5 bg-slate-50 rounded-xl">
          <div className="mt-4 mb-4 w-[40%]">
            <h1 className="text-xl font-semibold">Rental Space Title:</h1>
            <input
              type="text"
              value={spaceDetail.spaceName}
              name="spaceName"
              onChange={handleSpaceDetail}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
            />
          </div>

          <div className="mb-4 w-[40%]">
            <h1 className="text-xl font-semibold">InDetail Description:</h1>
            <textarea
              rows={4}
              name="spaceInDetail"
              value={spaceDetail.spaceInDetail}
              onChange={handleSpaceDetail}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-1 w-[40%]">
            <h1 className="text-xl font-semibold">Available Space:</h1>

            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="house"
                name="spaceType"
                value="house"
                checked={spaceDetail.spaceType === "house"}
                className="scale-150"
                onChange={handleSpaceDetail}
              />
              <label htmlFor="house">House</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="flat"
                value="flat"
                name="spaceType"
                checked={spaceDetail.spaceType === "flat"}
                className="scale-150"
                onChange={handleSpaceDetail}
              />
              <label htmlFor="flat">Flat</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input 
              type="radio"
              id="single-room"
              value="single room" 
              name="spaceType" 
              checked={spaceDetail.spaceType==="single room"}
              className="scale-150" 
              onChange={handleSpaceDetail}
              />
              <label htmlFor="single-room">Single Room</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input 
              type="radio" 
              id="double-room"
              value="double room"
              name="spaceType"
              checked={spaceDetail.spaceType==="double room"} 
              className="scale-150"
              onChange={handleSpaceDetail}
              />
              <lable htmlFor="double-room">Double Room</lable>
            </div>
          </div>
          {/* amenities starts heree below div */}
          <div className="mb-4 flex flex-col gap-y-1 w-[40%]">
            <h1 className="text-xl font-semibold">Amenities:</h1>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="on-tap-water"
                name="onTapWater"
                checked={spaceDetail.onTapWater}
                onChange={handleSpaceDetail}
                className="scale-150"
              />
              <label htmlFor="on-tap-water">On-tap Water</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input 
              type="checkbox"
              id="wifi" 
              name="wifi" 
              checked={spaceDetail.wifi}
              onChange={handleSpaceDetail}
              className="scale-150" 
              />
              <label htmlFor="wifi">Wifi</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input 
              type="checkbox" 
              id="balcony"
              name="balcony" 
              checked={spaceDetail.balcony}
              onChange={handleSpaceDetail}
              className="scale-150" 
              />
              <label htmlFor="balcony">Balcony</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="pet-fiendly"
                name="petFriendly"
                checked={spaceDetail.petFriendly}
              onChange={handleSpaceDetail}
                className="scale-150"
              />
              <label htmlFor="pet-friendly">Pet Friendly</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="air-conditon"
                name="airCondition"
                checked={spaceDetail.airCondition}
                onChange={handleSpaceDetail}
                className="scale-150"
              />
              <label htmlFor="air-condition">Air Condition</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="parking-two-wheeler"
                name="parkingTwoWheeler"
                checked={spaceDetail.parkingTwoWheeler}
                onChange={handleSpaceDetail}
                className="scale-150"
              />
              <label htmlFor="parking-two-wheeler">Parking Two-Wheeler</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="parking-four-wheeler"
                name="parkingFourWheeler"
                checked={spaceDetail.parkingFourWheeler}
                onChange={handleSpaceDetail}
                className="scale-150"
              />
              <label htmlFor="parking-four-wheeler">Parking Four-Wheeler</label>
            </div>
          </div>

          <div className="mb-4 w-[40%]">
            <h1 className="text-xl font-semibold">Rent:</h1>
            <input
              type="text"
              name="spaceRent"
              value={spaceDetail.spaceRent}
              onChange={handleSpaceDetail}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
            />
          </div>

          <div className="mb-4 w-[40%]">
            <h1 className="text-xl font-semibold">Address:</h1>
            <input
              type="text"
              name="spaceAddress"
              value={spaceDetail.spaceAddress}
              onChange={handleSpaceDetail}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
            />
          </div>

          <div className="mb-4 w-[40%]">
            <h1 className="text-xl font-semibold">Phone Number:</h1>
            <input
              type="text"
              name="spacePhone"
              value={spaceDetail.spacePhone}
              onChange={handleSpaceDetail}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
            />
          </div>

          {/* <div className="mb-4">
                <h1 className="text-xl font-semibold">Photos:</h1>
                <input type="file" className="border-2 border-gray-400 w-[50%] h-50 p-2 rounded-xl" />
                <input type="file" className="border-2 border-gray-400 w-[50%] h-50 p-2 rounded-xl" />
             </div> */}
          <div className="mb-4 w-[40%]">
            <h1 className="text-xl font-semibold w-[40%]">Photos:</h1>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border-2 border-gray-400 w-[100%] p-2 rounded-xl cursor-pointer"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4 overflow-auto">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Preview ${index + 1}`}
                className="w-90 h-90 object-fit border-2 border-gray-500 rounded-xl"
              />
            ))}
          </div>

          <div className="text-xl font-semibold w-[40%]">
            <h1 className="mb-4 w-[40%]">Exact Location:</h1>
          </div>
        </form>
        {/* </div> */}
      </div>
    </>
  );
}
