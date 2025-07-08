import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <h2>Footer</h2>
    </div>
  );
};

export default RootLayout;
