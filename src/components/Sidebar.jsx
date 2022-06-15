import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoKongpos from "../assets/logo-kongpos-app.png";
import SidebarMenu from "./SidebarMenu";
import { menus } from "./SidebarMenuData";

const Sidebar = ({ open, openMobile, setOpenMobile, setTitle }) => {
  const [aktif, setAktif] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.location.pathname !== "/") {
  //     setAktif(() => {
  //       const menuAktif = menus.find(
  //         (menu) => window.location.pathname.split("/")[1] === menu.link
  //       );

  //       if (menuAktif.subMenu) {
  //         return menuAktif.subMenu.find(
  //           (sub) => window.location.pathname.slice(1) === sub.link
  //         );
  //       }

  //       return menuAktif;
  //     });
  //   } else {
  //     setAktif(menus[0]);
  //   }
  // }, [menus]);

  return (
    <div
      className={`fixed  md:left-0 w-72 h-screen bg-white shadow-xl transition-all ease-in-out duration-300 ${
        !open ? "md:w-20" : "md:w-72"
      } ${!openMobile ? "left-[-100vw]" : "left-0"}`}
    >
      {/* title app */}
      <div
        className={`h-16 flex items-center mb-5 ${
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
      <ul className="px-5 flex flex-col">
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
