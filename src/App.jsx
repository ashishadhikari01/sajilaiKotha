import React, { useState,useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios"

import Layout from "./components/Layout/Layout";
import Home from "./components/Layout/Home"
import Login from "./components/Layout/Login"
import Signup from "./components/Layout/Signup";

import AuthRequired from "./components/AuthRequired";
import RoleChoose from "./RoleChoose";
import SystemRender from "./components/SystemRender";

import TenantWatchlist from "./components/Tenant/TenantWatchlist";
import TenantHome from "./components/Tenant/TenantHome";
import TenantAccount from "./components/Tenant/TenantAccount";
import TenantLogout from "./components/Tenant/TenantLogout";
import TenantSpaceDetail from "./components/Tenant/TenantSpaceDetail"
// import PotentialTenant from "./components/Landlord/PotentialTenant";

import LandlordHome from "./components/Landlord/LandlordDashboard";
import LandlordListing from "./components/Landlord/LandlordListing";
import LandlordListingDetails from "./components/Landlord/LandlordListingDetails"
import PotentialTenant from "./components/Landlord/PotentialTenant";

function App() {
  // const location=useLocation()
  axios.defaults.withCredentials=true
  const [isAuthenticated, setIsAuthenticated]=useState(true)
  const [loading, setLoading] = useState(true)
  // console.log(isAuthenticated)
  console.log(isAuthenticated)
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            />} />
            <Route path="/signup" element={<Signup />} />
          </Route> 
          
        <Route element={<AuthRequired isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} loading={loading} setLoading={setLoading} />}>
          <Route path="/role" element={<RoleChoose />} />

          <Route path="/role/:role" element={<SystemRender />}>
            <Route path="/role/:role" element={<TenantHome />} />
            <Route path="/role/:role/:space_id" element={<TenantSpaceDetail/>}></Route>
            <Route path="/role/:role/watchlist" element={<TenantWatchlist />} />
            <Route path="/role/:role/account" element={<TenantAccount />} />
            <Route path="/role/:role/logout" element={<TenantLogout />} />

            <Route path="/role/:role/dashboard" element={<LandlordHome />} />
            <Route path="/role/:role/listing" element={<LandlordListing />} />
            <Route path="/role/:role/potentialtenant" element={<PotentialTenant/>}/>
            <Route path="/role/:role/listing/:item_id" element={<LandlordListingDetails/>}/>
            
          </Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
