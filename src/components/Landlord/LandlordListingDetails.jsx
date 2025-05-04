import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function LandlordListingDetails() {
  const [specificHandleUpdateDetail, setSpecificHandleUpdateDetail] = useState([]);
  if (specificHandleUpdateDetail.length < 0) {
    return <p>loading...</p>;
  }

  let getParams = useParams();
  let spaceId = getParams.item_id;
  console.log(spaceId);
  console.log(specificHandleUpdateDetail);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getspecificspace", {
        params: {
          item: spaceId,
        },
      })
      .then((res) => {
        console.log("then", res);
        setSpecificHandleUpdateDetail(res.data.space);
      })
      .catch((err) => console.log("error", err));
  }, []);
  //   console.log(typeof specificHandleUpdateDetail.amenities);
  const availableamenities = [];
  for (let key in specificHandleUpdateDetail.amenities) {
    // console.log(`${key}: ${specificHandleUpdateDetail.amenities[key]}`)
    if (specificHandleUpdateDetail.amenities[key]) {
      availableamenities.push(key);
      console.log(key);
    }
  }
  const [updateDetail, setUpdateDetail] = useState({
    s_id:spaceId,
    s_name: "",
    s_description: "",
    s_rent: "",
    s_address: "",
    s_phone: "",
    s_type: "",
    onTapWater:false,
    wifi:true,
    balcony:false,
    petFriendly:false,
    airCondition:false,
    parkingTwoWheeler:false,
    parkingFourWheeler:false
  });
  console.log(updateDetail)

  function handleUpdateDetail(event) {
    const {name,value,type,checked}=event.target
    setUpdateDetail((prev) => {
      return {
        ...prev,
        [name]: type==='checkbox'? checked:value,
      };
    });
  }
  function updateSpace(){
    axios.put('http://localhost:5000/updateSpaceDetails',updateDetail)
    .then((res)=>console.log('from update res',res))
    .catch((err)=>console.log('error on update  catch',err))
  }
  function deleteSpace(){
    console.log('delspac')
    axios.delete('http://localhost:5000/deleteSpace',{
      data:{
      spaceId:spaceId
    }
  })
    .then((res)=>{
      console.log('from delete space', res)
      useNavigate('/')
    })
    .catch((err)=>console.log('error on delete space',err))
  }
  return (
    <>
      <div className="bg-blue-50 pb-7">
        <a href="#updateDetail" className="sticky top-5 left-[95%]">
          Down
        </a>
        <div className="mx-auto w-[70%] pt-3 pb-3" id="handleUpdateDetail">
          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Space Title</p>
            <input
              readOnly
              type="text"
              value={specificHandleUpdateDetail.spacename}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Space Detail</p>
            <textarea
              readOnly
              value={specificHandleUpdateDetail.spacedetail}
              rows="5"
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Space Type</p>
            <input
              readOnly
              type="text"
              value={specificHandleUpdateDetail.spacetype}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Amenities</p>
            <div className="flex gap-3">
              {availableamenities.map((item) => {
                return (
                  <p className="italic px-3 py-2 border-2 border-white rounded-lg bg-zinc-300  text-lg">
                    {item}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Rent</p>
            <input
              readOnly
              type="text"
              value={specificHandleUpdateDetail.rent}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Address</p>
            <input
              readOnly
              type="text"
              value={specificHandleUpdateDetail.address}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">PhoneNumber</p>
            <input
              readOnly
              type="text"
              value={specificHandleUpdateDetail.phonenumber}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>
        </div>
        {/* <p>photos</p> */}
        <div className="flex justify-center w-full pb-15">
          <div className="flex flex-wrap gap-17 w-[70%]">
            {specificHandleUpdateDetail.photos?.map((photo, index) => {
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
        <div className="bg-stone-300 h-15"></div>

        {/* update details starts from here */}

        <div className="mx-auto w-[70%] pt-3 pb-3" id="updateDetail">
          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Space Title</p>
            <input
              type="text"
              name="s_name"
              value={updateDetail.s_name || specificHandleUpdateDetail.spacename}
              onChange={handleUpdateDetail}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Space Detail</p>
            <textarea
              type="text"
              rows="5"
              name="s_description"
              value={
                updateDetail.s_description || specificHandleUpdateDetail.spacedetail
              }
              onChange={handleUpdateDetail}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2  ml-1">
            <p className="text-lg font-semibold pb-1">Space Type</p>
            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="house"
                name="s_type"
                value="house"
                checked={updateDetail.s_type === "house"}
                className="scale-150"
                onChange={handleUpdateDetail}
              />
              <label htmlFor="house">House</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="flat"
                value="flat"
                name="s_type"
                checked={updateDetail.s_type === "flat"}
                className="scale-150"
                onChange={handleUpdateDetail}
              />
              <label htmlFor="flat">Flat</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="single-room"
                value="single room"
                name="s_type"
                checked={updateDetail.s_type === "single room"}
                className="scale-150"
                onChange={handleUpdateDetail}
              />
              <label htmlFor="single-room">Single Room</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="radio"
                id="double-room"
                value="double room"
                name="s_type"
                checked={updateDetail.s_type === "double room"}
                className="scale-150"
                onChange={handleUpdateDetail}
              />
              <lable htmlFor="double-room">Double Room</lable>
            </div>
          </div>

          <div className="mb-2 ml-1">
            <p className="text-lg font-semibold pb-1">Amenities</p>
            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="on-tap-water"
                name="onTapWater"
                checked={handleUpdateDetail.onTapWater}
                onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="on-tap-water">On-tap Water</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="wifi"
                name="wifi"
                  checked={handleUpdateDetail.wifi}
                  onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="wifi">Wifi</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="balcony"
                name="balcony"
                  checked={handleUpdateDetail.balcony}
                  onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="balcony">Balcony</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="pet-fiendly"
                name="petFriendly"
                checked={handleUpdateDetail.petFriendly}
                  onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="pet-friendly">Pet Friendly</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="air-conditon"
                name="airCondition"
                checked={handleUpdateDetail.airCondition}
                onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="air-condition">Air Condition</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="parking-two-wheeler"
                name="parkingTwoWheeler"
                checked={handleUpdateDetail.parkingTwoWheeler}
                onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="parking-two-wheeler">Parking Two-Wheeler</label>
            </div>

            <div className="flex gap-x-2 text-lg">
              <input
                type="checkbox"
                id="parking-four-wheeler"
                name="parkingFourWheeler"
                checked={handleUpdateDetail.parkingFourWheeler}
                onChange={handleUpdateDetail}
                className="scale-150"
              />
              <label htmlFor="parking-four-wheeler">Parking Four-Wheeler</label>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Rent</p>
            <input
              type="text"
              name="s_rent"
              value={updateDetail.s_rent || specificHandleUpdateDetail.rent}
              onChange={handleUpdateDetail}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">Address</p>
            <input
              type="text"
              name="s_address"
              value={updateDetail.s_address || specificHandleUpdateDetail.address}
              onChange={handleUpdateDetail}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-semibold pb-1">PhoneNumber</p>
            <input
              type="text"
              name="s_phone"
              value={updateDetail.s_phone || specificHandleUpdateDetail.phonenumber}
              onChange={handleUpdateDetail}
              className="border-3 border-zinc-400 outline-none p-2 w-[100%] rounded-lg text-lg italic"
            />
          </div>

          <div className="flex gap-x-7 mt-5">
          <button className="border border-green-500 px-4.5 py-1.5 bg-green-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in" onClick={updateSpace}>Update Space</button>
          <button className="border border-red-500 px-4.5 py-1.5 bg-red-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in" onClick={deleteSpace} >Delete Space</button>
          </div>

        </div>
      </div>
    </>
  );
}
