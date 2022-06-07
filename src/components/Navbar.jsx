import {
  faBars,
  faBell,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { setOpen, setOpenSm } from "../features/MenuSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-20 px-5 bg-white shadow-md flex items-center justify-between sticky top-0">
      <div
        onClick={() => dispatch(setOpen())}
        className="cursor-pointer hidden md:block"
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      <div
        onClick={() => dispatch(setOpenSm())}
        className="cursor-pointer md:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      <div>
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
