import {
  faBars,
  faBell,
  faCaretDown,
  faEnvelope,
  faSearch,
  faSignOutAlt,
  faStoreAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsahas, logout, setUsaha } from "../features/auth";
import Modal from "./Modal";
import { Menu } from "@headlessui/react";
import Dropdown from "./Dropdown";

export const Navbar = ({ open, openMobile, setOpen, setOpenMobile }) => {
  const [modalUsaha, setModalUsaha] = useState(false);
  const [usahas, setUsahas] = useState([]);

  const dispatch = useDispatch();
  const { status, message, user } = useSelector((state) => state.auth);

  const handleGetUsahas = async () => {
    setModalUsaha(true);
    const get = await dispatch(getUsahas());
    const usahas = await get.payload;
    setUsahas(usahas);
  };

  const handlePilihUsaha = (usaha) => {
    dispatch(setUsaha(usaha));
    setModalUsaha(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user.usaha) {
      handleGetUsahas();
    }
  }, [user]);

  const menuUser = [
    {
      title: "Profil",
      action: null,
      icon: faUser,
    },
    {
      title: "logout",
      action: handleLogout,
      icon: faSignOutAlt,
    },
  ];

  return (
    <div
      className={
        "h-16 px-5 shadow-md flex items-center sticky top-0 bg-white z-[1]"
      }
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
        onClick={handleGetUsahas}
      >
        <FontAwesomeIcon icon={faStoreAlt} className="mr-3" />
        <div className="font-medium mr-3 hidden md:block">
          {user.usaha ? user.usaha.nama_usaha : "Pilih Usaha"}
        </div>
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
            <Menu as={"div"} className="relative">
              <Menu.Button className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-blue-500">
                <span className="font-bold text-white">
                  {user.nama_user.slice(0, 1)}
                </span>
              </Menu.Button>
              <Dropdown>
                {menuUser.map((menu, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-700 text-white" : "text-gray-900"
                        } group flex gap-3 w-full items-center rounded-md px-3 py-2 capitalize`}
                        onClick={menu.action}
                      >
                        <FontAwesomeIcon
                          icon={menu.icon}
                          className={active ? "text-white" : "text-gray-500"}
                        />
                        {menu.title}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Dropdown>
            </Menu>
          </li>
        </ul>
      </div>

      {/* modal pilih usaha */}
      <Modal
        open={modalUsaha}
        setOpen={setModalUsaha}
        modalHeader={"Pilih usaha"}
      >
        {/* sambil nunggu kasi loading */}
        {status === "pending" && (
          <div className="flex justify-center p-4">
            <svg
              role="status"
              className="w-10 h-10 text-gray-200 animate-spin  fill-blue-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {/* kalo ada error kasi error */}
        {status === "rejected" && (
          <div className="flex justify-center p-4">
            <h1 className="text-xl font-medium text-red-700">{message}</h1>
          </div>
        )}

        {status === "fulfilled" && usahas.length <= 0
          ? "Anda belum memiliki usaha"
          : null}

        {usahas && usahas.length > 0
          ? usahas.map((usaha, index) => (
              <div
                className="font-medium rounded-lg border border-gray-300 p-3 mb-2 cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:text-white duration-200"
                key={index}
                onClick={() => handlePilihUsaha(usaha)}
              >
                {usaha.nama_usaha}
              </div>
            ))
          : null}
      </Modal>
    </div>
  );
};
