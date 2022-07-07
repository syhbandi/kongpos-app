import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logoKongpos from "../assets/logo-kongpos-app.png";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../dataSource/SidebarMenuData";

const Sidebar = ({ open, openMobile, setOpenMobile, setTitle }) => {
  const [aktif, setAktif] = useState("");

  return (
    <div
      className={`fixed top-0 flex flex-col md:left-0 w-72 h-screen bg-white shadow-xl transition-all ease-in-out duration-300 ${
        !open ? "md:w-20" : "md:w-72"
      } ${!openMobile ? "left-[-100vw]" : "left-0 z-[2]"}`}
    >
      {/* title app */}
      <div
        className={`h-16 flex items-center ${
          !open && !openMobile ? "px-5 justify-center" : "px-10"
        }`}
      >
        <img
          src={logoKongpos}
          alt="logo kongpos"
          className={`w-7 ${open || openMobile ? "mr-3" : ""}`}
        />
        <span className="text-2xl uppercase font-bold">
          {!open && !openMobile ? "" : "kongpos"}{" "}
        </span>
        {openMobile && (
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setOpenMobile(false)}
            className="absolute text-xl right-5"
          />
        )}
      </div>

      {/* sidebar menus */}
      <ul className="px-5 py-3 flex flex-col h-full overflow-auto">
        {menus.map((menu, index) => (
          <SidebarMenu
            menu={menu}
            key={index}
            open={open}
            openMobile={openMobile}
            aktif={aktif}
            setAktif={setAktif}
            setOpenMobile={setOpenMobile}
            setTitle={setTitle}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
