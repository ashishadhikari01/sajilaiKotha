import React from "react";
import SystemHeader from "./SystemHeader";
import SystemTopHeader from "./SystemTopHeader";
import { Outlet } from "react-router";


export default function TenantLayout() {
  return (
    <>
      <div className="flex h-screen">
        <SystemHeader  />
        <div className="flex flex-col flex-grow">
          <SystemTopHeader  />
          <Outlet />
        </div>
      </div>
    </>
  );
}
