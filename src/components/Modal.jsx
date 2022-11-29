import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";

const Modal = ({
  open,
  setOpen,
  children,
  modalHeader,
  width,
  maxHeight,
  scroll = true,
}) => {
  const [forWidth, setWidth] = useState("md:w-[500px]");
  const [forHeight, setHeight] = useState("max-h-[700px]");
  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setOpen(false);
      return;
    }
  };
  useEffect(() => {
    width && setWidth(width);
    maxHeight && setHeight(maxHeight);
  });

  if (open) {
    return (
      <div
        id="modal"
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 overflow-hidden flex items-center justify-center "
        onClick={handleClose}
      >
        {/* dialog */}
        <div
          className={`rounded-lg bg-white shadow-lg p-3 w-full ${forWidth} overflow-hidden animate-fadeIn mx-5 md:mx-0 flex flex-col`}
        >
          <div className="flex items-center justify-between border-b border-gray-300">
            <h1 className="text-xl font-medium">{modalHeader}</h1>
            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div
            className={`mt-3 ${forHeight} ${
              scroll ? "overflow-auto" : ""
            } flex-grow`}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
};

const ModalSubmit = ({
  open,
  setOpen,
  children,
  modalHeader,
  width,
  maxHeight,
  scroll = true,
}) => {
  const [forWidth, setWidth] = useState("md:w-[500px]");
  const [forHeight, setHeight] = useState("max-h-[700px]");
  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setOpen(false);
      return;
    }
  };
  useEffect(() => {
    width && setWidth(width);
    maxHeight && setHeight(maxHeight);
  });

  if (open) {
    return (
      <div
        id="modal"
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 overflow-hidden flex items-center justify-center"
        onClick={handleClose}
      >
        {/* dialog */}
        <div
          className={`rounded-lg bg-white shadow-lg p-3 w-full ${forWidth} overflow-hidden animate-fadeIn mx-5 md:mx-0 flex flex-col`}
        >
          <div className="flex items-center justify-between border-b border-gray-300">
            <h1 className="text-xl font-medium">{modalHeader}</h1>
            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className={`mt-3 ${forHeight} overflow-auto flex-grow`}>
            {" "}
            {children}
            {/* <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
              <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl"> */}
            {/* <h1 className="text-3xl text-center text-purple-700">
              Input Data Barang
            </h1> */}
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center">
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export { Modal, ModalSubmit };
