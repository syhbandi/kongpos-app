import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [title, setTitle] = useState("");
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-all ease-in-out duration-300 bg-slate-100 ${
        !open ? "md:pl-20" : "md:pl-72"
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
        setTitle={setTitle}
      />
      <div className="p-5">
        <Breadcrumb title={title} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
