import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios"

import Layout from "./components/Layout/Layout";
import Home from "./components/Layout/Home"
import Login from "./components/Layout/Login"
import Signup from "./components/Layout/Signup";

import RoleChoose from "./RoleChoose";
import SystemRender from "./components/SystemRender";

import TenantWatchlist from "./components/Tenant/TenantWatchlist";
import TenantHome from "./components/Tenant/TenantHome";
import TenantAccount from "./components/Tenant/TenantAccount";
import TenantLogout from "./components/Tenant/TenantLogout";

import LandlordHome from "./components/Landlord/LandlordDashboard";
import LandlordListing from "./components/Landlord/LandlordListing";

function App() {
  axios.defaults.withCredentials=true
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route> 

          <Route path="/role" element={<RoleChoose />} />

          <Route path="/role/:role" element={<SystemRender />}>
            <Route path="/role/:role" element={<TenantHome />} />
            <Route path="/role/:role/watchlist" element={<TenantWatchlist />} />
            <Route path="/role/:role/account" element={<TenantAccount />} />
            <Route path="/role/:role/logout" element={<TenantLogout />} />

            <Route path="/role/:role/dashboard" element={<LandlordHome />} />
            <Route path="/role/:role/listing" element={<LandlordListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
