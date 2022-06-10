import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col transition-all ease-in-out duration-300 ${
        !open ? "md:pl-28" : "md:pl-72"
      }`}
    >
      <Navbar
        open={open}
        setOpen={setOpen}
        setOpenMobile={setOpenMobile}
        openMobile={openMobile}
      />
      <Sidebar
        open={open}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
      />
      <div className="p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
