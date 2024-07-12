import { useState } from "react";
import commentIcon from "../../../assets/commentWhite.svg";
import { useCommentPinqoutes } from "@/hooks/useComment";
import CommentForm from "./Comment.Form";
import { CreateComment } from "@/types/comment.types";
import CommentModal from "@/components/Modal/CommentModal";
import { usePinDetails } from "@/hooks/usePinAction";
import { Link, useParams } from "react-router-dom";
import test from "../../../assets/IMG_7760.jpg";
import { getCurrentUserId } from "@/services/auth.util";

import dots from "../../../assets/dots.svg";
import CommentList from "./Comment.List";

interface CommentProps {
  pinId: string;
}

const Comment: React.FC<CommentProps> = ({ pinId }) => {
  const { pinDetails, error } = usePinDetails(pinId);
  const loggedInUserId = getCurrentUserId();
  const { handleCommentPin, loading, successful } = useCommentPinqoutes(
    loggedInUserId,
    pinId
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValues: CreateComment = {
    comment: "",
  };

  const renderFile = () => {
    const fileType = pinDetails?.file_type;
    const fileUrl = pinDetails?.file_url;

    if (fileType?.startsWith("image")) {
      return (
        <img
          className="h-[100%] w-[100%] rounded-l-[6px] object-cover"
          src={fileUrl}
          alt={`Pin by ${pinDetails?.user_id}`}
        />
      );
    } else if (fileType?.startsWith("video")) {
      return (
        <video
          loop
          controls
          className="h-[100%] w-[100%] rounded-l-[6px] object-cover"
        >
          <source src={fileUrl} type="video/MP4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button id={pinId} onClick={openModal}>
        <img src={commentIcon} alt="Comment" />
      </button>
      {isModalOpen && (
        <CommentModal onClose={closeModal}>
          <div className="flex w-full h-[100%]">
            <div>{renderFile()}</div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center px-3 py-4 border-b justify-between">
                <div>
                  <Link
                    to={`/profile/${pinDetails?.user_id}`}
                    className="flex items-center gap-2 w-[322px] rounded-lg"
                  >
                    <img
                      className="w-[35px] h-[35px] rounded-[50%] ml-[0.3rem] mr-[0.3rem] object-cover"
                      src={pinDetails?.profile_picture_url}
                      alt=""
                    />
                    <div>
                      <h2 className="w-[250px] font-normal">
                        {pinDetails?.created_by}
                      </h2>
                    </div>
                  </Link>
                </div>
                <div className="mt-[10px]">
                  <button>
                    <img src={dots} alt="" />
                  </button>
                </div>
              </div>
              <CommentList pinId={pinDetails?.id || ""} />
              {/* </div> */}
              <CommentForm
                loading={loading}
                successful={successful}
                onSubmit={handleCommentPin}
                initialValues={initialValues}
                onClose={closeModal}
              />
            </div>
          </div>
        </CommentModal>
      )}
    </>
  );
};

export default Comment;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { PinFormInput } from "@/types/pin.types";
// import { usePinAction, usePinDetails } from "@/hooks/usePinAction";
// import { pinValidationSchema } from "@/validations/pin.validation";
// import EditProfileModal from "../Modal/EditProfileModal";
// import PinForm from "./Pin.Form";

// const PinUpdate: React.FC = () => {
//   const { id } = useParams();
//   const { handleUpdatePin, message, successful, loading } = usePinAction();
//   const { pinDetails } = usePinDetails(id || "");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const initialValues: PinFormInput = {
//     title: pinDetails?.title || "",
//     description: pinDetails?.description || "",
//     file_url: pinDetails?.file_url || "",
//     link: pinDetails?.link || "",
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   async function submitUpdatePin(values: PinFormInput) {
//     await handleUpdatePin(id || "", values);
//     window.location.reload();
//   }

//   return (
//     <>
//       <div className="flex">
//         <button onClick={openModal} className="font-semibold">
//           Edit Pin
//         </button>
//         {isModalOpen && (
//           <EditProfileModal onClose={closeModal}>
//             <PinForm
//               title="Edit Pin"
//               loading={loading}
//               successful={successful}
//               message={message}
//               onSubmit={(values) => submitUpdatePin(values)}
//               validationSchema={pinValidationSchema}
//               initialValues={initialValues}
//               isNewPin={true}
//               onClose={closeModal}
//             />
//           </EditProfileModal>
//         )}
//       </div>
//     </>
//   );
// };

// export default PinUpdate;
