import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAktif, setSubMenuAktif } from "../features/MenuSlice";
import logoKongpos from "../assets/logo-kongpos-app.png";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  const { menus, open, menuAktif } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      setAktif(menus.find((menu) => menu.link === window.location.pathname))
    );
  }, [dispatch, menuAktif, menus]);

  const navigasiMenu = (menu) => {
    dispatch(setAktif(menu));

    if (menu.subMenu) {
      dispatch(setSubMenuAktif(menu));
      return;
    }

    navigate(menu.link);
  };

  return (
    <div
      className={`${
        !open ? "w-28 " : "w-72"
      }  h-screen bg-white shadow-xl duration-300 fixed top-0 -left-full md:left-0 overflow-auto z-auto`}
    >
      <div className="flex items-center justify-center cursor-pointer py-5 duration-300">
        <img
          src={logoKongpos}
          alt="logo kongpos"
          className="w-10 h-10 object-fill"
        />
        <h1
          className={`font-bold text-3xl text-gray-800 ${
            !open ? "hidden" : "ml-3"
          }`}
        >
          KONGPOS
        </h1>
      </div>
      <ul className="p-5 flex flex-col gap-3">
        {menus.map((menu, index) => (
          <li key={index}>
            <button
              className={`w-full rounded-xl cursor-pointer flex items-center p-4 text-gray-800 gap-3 ${
                !open ? "justify-center" : ""
              }  ${menu.nama === menuAktif.nama && "bg-yellow-300 shadow-xl"}`}
              onClick={() => navigasiMenu(menu)}
            >
              <FontAwesomeIcon icon={menu.icon} className={`text-xl`} />
              {open && <span className="font-medium">{menu.nama}</span>}
              {menu.subMenu && (
                <span className="flex flex-grow items-center justify-end">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
