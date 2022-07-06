import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ open, setOpen, children, modalHeader }) => {
  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setOpen(false);
      return;
    }
  };

  if (open) {
    return (
      <div
        id="modal"
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[5] overflow-hidden flex items-center justify-center"
        onClick={handleClose}
      >
        {/* dialog */}
        <div className="rounded-lg bg-white shadow-lg p-3 w-full md:w-[500px] max-h-[700px] animate-fadeIn overflow-auto mx-5 md:mx-0">
          <div className="flex items-center justify-between border-b border-gray-300">
            <h1 className="text-xl font-medium">{modalHeader}</h1>
            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    );
  }
};

export default Modal;
