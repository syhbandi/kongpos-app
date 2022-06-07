import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Sidebarsm } from "./components/Sidebarsm";
import { Dashboard } from "./pages/Dashboard";
import { Master } from "./pages/Master";

function App() {
  const { open } = useSelector((state) => state.menu);
  const user = null;

  if (user) {
    return <>Belum login</>;
  } else {
    return (
      <BrowserRouter>
        <div
          className={`flex flex-col bg-slate-100 duration-300 min-h-screen ${
            !open ? "md:pl-28" : "md:pl-72"
          }`}
        >
          <Sidebar />
          <Sidebarsm />
          <Navbar />
          <div className="p-5 flex flex-col space-y-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/master" element={<Master />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
