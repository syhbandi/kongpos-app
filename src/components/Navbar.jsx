import {
  faBars,
  faBell,
  faCaretDown,
  faEnvelope,
  faSearch,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Navbar = ({ open, openMobile, setOpen, setOpenMobile }) => {
  return (
    <div
      className={"h-16 px-5 shadow-md flex items-center sticky top-0 bg-white"}
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer hidden md:block"
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </div>
      <div
        onClick={() => setOpenMobile(!openMobile)}
        className="cursor-pointer md:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </div>
      <div
        className="flex items-center ml-5 cursor-pointer"
        onClick={() => console.log("button ganti toko")}
      >
        <FontAwesomeIcon icon={faStoreAlt} className="mr-3" />
        <div className="font-medium mr-3 hidden md:block">Mane mini resto</div>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <div className="ml-auto">
        <ul className="flex items-center gap-7">
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faSearch} />
          </li>
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faBell} />
            <div className="bg-red-600 rounded-full p-1 absolute -right-1 -top-1"></div>
          </li>
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} />
            <div className="bg-red-600 rounded-full p-1 absolute -right-1 -top-1"></div>
          </li>
          <li>
            <div className="flex items-center cursor-pointer">
              <div className="rounded-full bg-gray-600 p-4"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
