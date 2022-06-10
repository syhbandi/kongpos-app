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
      className={"h-20 px-5 bg-white shadow-md flex items-center sticky top-0"}
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer hidden md:block"
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      <div
        onClick={() => setOpenMobile(!openMobile)}
        className="cursor-pointer md:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      <div
        className="flex items-center ml-5 cursor-pointer"
        onClick={() => console.log("button ganti toko")}
      >
        <FontAwesomeIcon icon={faStoreAlt} className="mr-3 text-xl" />
        <div className="text-2xl font-medium mr-3 hidden md:block">
          Mane mini resto
        </div>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <div className="ml-auto">
        <ul className="flex items-center space-x-10">
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </li>
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faBell} className="text-xl" />
            <div className="bg-red-600 rounded-full p-1 absolute -right-1 -top-1"></div>
          </li>
          <li className="relative cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            <div className="bg-red-600 rounded-full p-1 absolute -right-1 -top-1"></div>
          </li>
          <li>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="rounded-full bg-gray-600 p-5"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
