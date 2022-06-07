import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Overlay = () => {
  return (
    <div className="w-screen h-screen fixed bg-gray-700 md:hidden flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white text-center">
        Instal aplikasi untuk melanjutkan
      </h1>
      <button className="px-8 py-4 bg-yellow-400 rounded-full mt-6">
        <span className="text-xl font-bold">
          <FontAwesomeIcon icon={faDownload} className="mr-3" /> Unduh sekarang
        </span>
      </button>
    </div>
  );
};

export default Overlay;
