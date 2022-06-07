import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoKongpos from "../assets/logo-kongpos-app.png";
import { setAktif, setOpenSm } from "../features/MenuSlice";
export const Sidebarsm = () => {
  const { menus, menuAktif, openSm } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      setAktif(menus.find((menu) => menu.link === window.location.pathname))
    );
  }, [dispatch, menuAktif, menus]);

  const navigasiMenu = (menu) => {
    dispatch(setAktif(menu));
    dispatch(setOpenSm());
    navigate(menu.link);
  };
  return (
    <div
      className={`fixed top-0 left-0 z-[1000] w-screen h-screen overflow-hidden duration-300 ${
        openSm ? "" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-slate-700 bg-opacity-50"
        onClick={(e) => dispatch(setOpenSm())}
      ></div>
      <div
        className={`w-72 h-screen bg-white shadow-xl duration-300 fixed top-0  overflow-auto z-auto animate-openMenu ${
          openSm ? "left-0" : "-left-full "
        }`}
      >
        <div className="flex items-center justify-center cursor-pointer py-5 duration-300">
          <img
            src={logoKongpos}
            alt="logo kongpos"
            className="w-10 h-10 object-fill"
          />
          <h1 className={`font-bold text-3xl text-gray-800`}>KONGPOS</h1>
        </div>
        <ul className="p-5 flex gap-3 flex-col">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`hover:bg-yellow-300 hover:shadow-xl rounded-xl cursor-pointer flex items-center space-x-5 p-4 text-gray-800 ${
                menu.nama === menuAktif.nama ? "bg-yellow-300 shadow-xl" : ""
              }`}
              onClick={() => navigasiMenu(menu)}
            >
              <FontAwesomeIcon
                icon={menu.icon}
                className={`text-xl duration-300`}
              />
              <span>{menu.nama}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
