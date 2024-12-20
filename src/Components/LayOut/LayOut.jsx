import React from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LayOut() {
  return (
    <>
      <Navbar />
      <Outlet className="min-vh-100"/>
      <Toaster />

      <Footer />
    </>
  );
}
