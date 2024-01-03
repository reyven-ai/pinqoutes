import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const EditProfileModal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-75"
          onClick={onClose}
        />,
        document.getElementById("overlays") as Element
      )}
      {ReactDOM.createPortal(
        <div className="fixed top-0 right-0 h-full w-50 md:w-40rem bg-gray-100 p-4 shadow-md z-30 animate-left">
          {children}
        </div>,
        document.getElementById("overlays") as Element
      )}
    </>
  );
};

export default EditProfileModal;
