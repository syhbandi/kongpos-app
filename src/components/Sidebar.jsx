import {
  faClose,
  faContactBook,
  faDatabase,
  faFile,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoKongpos from "../assets/logo-kongpos-app.png";

const Sidebar = ({ open, openMobile, setOpenMobile }) => {
  const [aktif, setAktif] = useState({});
  const [menus] = useState([
    { title: "dashboard", link: "/", icon: faTachometerAlt },
    { title: "master", link: "master", icon: faDatabase },
    { title: "laporan", link: "laporan", icon: faFile },
    { title: "kontrak", link: "kontrak", icon: faContactBook },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setAktif(
        menus.find((menu) => window.location.pathname.slice(1) === menu.link)
      );
    } else {
      setAktif(menus[0]);
    }
  }, [menus]);

  const navigasiMenu = (menu) => {
    navigate(menu.link);
    setAktif(menu);
    setOpenMobile(false);
  };
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
      <div>
        <ul className="px-5 flex flex-col gap-3">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center px-5 py-3 font-medium cursor-pointer rounded-lg ${
                menu.title === aktif.title ? "bg-[#ffc90d] shadow-lg" : ""
              } ${!open && !openMobile ? "justify-center" : ""}`}
              onClick={() => navigasiMenu(menu)}
            >
              <FontAwesomeIcon
                icon={menu.icon}
                className={`${open || openMobile ? "mr-3" : ""}`}
              />
              <span className="capitalize">
                {open || openMobile ? menu.title : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
