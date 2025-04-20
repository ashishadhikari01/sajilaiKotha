import React, {} from "react";
// import { clickedContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useParams,Link } from "react-router-dom";
import TenantHome from "./Tenant/TenantHome";
import LandlordDashboard from "./Landlord/LandlordDashboard"
export default function TopHeader() {
  // const { isClicked, setIsClicked } = useContext(clickedContext);
  const navigate = useNavigate("");
  let {role}=useParams()
  console.log(role)

  // function tenantClick() {
  //   setIsClicked((prev) => {
  //     return {
  //       ...prev,
  //       tenant: true,
  //       landlord: false,
  //     };
  //   });
  //   navigate("/tenant");
  // }

  // function landlordClick() {
  //   setIsClicked((prev) => {
  //     return {
  //       ...prev,
  //       landlord: true,
  //       tenant: false,
  //     };
  //   });
  //   navigate("/landlord");
  // }
  return (
    <>
      <div className="flex items-center w-[100%] h-30 sticky top-0 right-0 bg-stone-200 border-b-3 border-gray-400 min-h-30 max-h-30 flex-wrap z-100">
        <div className="flex justify-between items-center mx-auto w-[95%]">
          <div className="flex flex-wrap gap-x-2 p-2 border-2 border-gray-300 rounded-xl cursor-pointer bg-zinc-50  text-wrap hover:bg-zinc-200 hover:border-2 hover:border-gray-500 ">
            <img src="/icons8-filter-100.png" width={25} height={25} />
            <p className="text-lg text-wrap">Filters</p>
          </div> 

          <div>
            <input
              type="text"
              placeholder="Search For Location"
              className="border w-70 h-10 p-1 rounded-lg bg-white border-2 border-gray-300 focus:border-blue-300"
            />
          </div>

          <div className="flex gap-x-5 text-xl">
            <Link to={`/role/tenant`}><button className={`p-2 rounded-xl transition-all duration-200 ease-in border-2 border-gray-400 bg-zinc-100 hover:border-2 hover:border-gray-500 hover:bg-zinc-200 cursor-pointer }`}>Tenant</button></Link>
            
            <Link to={`/role/landlord/dashboard`}><button className={`p-2 rounded-xl transition-all duration-200 ease-in border-2 border-gray-400 bg-zinc-100 hover:border-2 hover:border-gray-500 hover:bg-zinc-200 cursor-pointer } `}>Landlord</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
