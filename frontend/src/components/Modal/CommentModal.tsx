import { Close } from "@material-ui/icons";
import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const CommentModal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="fixed top-0 p-[2rem] left-0 w-full h-full z-20 bg-black bg-opacity-75"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="bg-[#e4e6eb] absolute right-10 rounded-[50%]"
          >
            <Close className="font-bold mx-1 my-1" />
          </button>
        </div>,
        document.getElementById("overlays") as Element
      )}
      {ReactDOM.createPortal(
        <div className="flex justify-center items-center min-h-screen">
          <div className="fixed top-0 h-[95%] my-7 mx-[auto] md:w-40rem rounded-[6px] bg-[#fff] shadow-md z-30 animate-left animate-slide-in-right">
            {children}
          </div>
        </div>,
        document.getElementById("overlays") as Element
      )}
    </>
  );
};

export default CommentModal;
