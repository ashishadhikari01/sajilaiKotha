import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import TenantLayout from "./components/system/TenantLayout";
import TenantHome from "./components/Tenant/TenantHome";
import TenantWatchlist from "./components/Tenant/TenantWatchlist";
import TenantAccount from "./components/Tenant/TenantAccount";
import TenantLogout from "./components/Tenant/TenantlLogout";

import LandlordLayout from "./components/system/LandlordLayout";
import LandlordDashboard from "./components/Landlord/LandlordDashboard";
import LandlordListing from "./components/Landlord/LandlordListing";
import LandlordAccount from "./components/Landlord/LandlordAccount";
import LandlordLogout from "./components/Landlord/LandlordLogout";

export const clickedContext = createContext();

function App() {
  const [isClicked, setIsClicked] = React.useState({
    tenant:true,
    landlord: false,
  });

  return (
    <>
      <clickedContext.Provider value={{ isClicked, setIsClicked }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {isClicked.tenant ? (
              <Route element={<TenantLayout />} path="/tenant">
                <Route path="/tenant" element={<TenantHome />} />
                <Route path="/tenant/watchlist" element={<TenantWatchlist />} />
                <Route path="/tenant/account" element={<TenantAccount />} />
                <Route path="/tenant/logout" element={<TenantLogout />} />
              </Route>
            ) : (
              <Route element={<LandlordLayout />} path="/landlord">
                <Route path="/landlord" element={<LandlordDashboard />} />
                <Route path="/landlord/listing" element={<LandlordListing />} />
                <Route path="/landlord/account" element={<LandlordAccount />} />
                <Route path="/landlord/logout" element={<LandlordLogout />} />
                console.log("im from landlord route section")
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </clickedContext.Provider>
    </>
  );
}

export default App;
