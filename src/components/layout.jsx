import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <div className="bg-gray-custom min-h-svh">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
