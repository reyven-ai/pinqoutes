import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PinFormInput } from "@/types/pin.types";
import { usePinAction, usePinDetails } from "@/hooks/usePinAction";
import { pinValidationSchema } from "@/validations/pin.validation";
import EditProfileModal from "../Modal/EditProfileModal";
import PinForm from "./Pin.Form";

const PinUpdate: React.FC = () => {
  const { id } = useParams();
  const { handleUpdatePin, message, successful, loading } = usePinAction();
  const { pinDetails } = usePinDetails(id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: PinFormInput = {
    title: pinDetails?.title || "",
    description: pinDetails?.description || "",
    image_url: pinDetails?.image_url || "",
    link: pinDetails?.link || "",
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function submitUpdatePin(values: PinFormInput) {
    await handleUpdatePin(id || "", values);
    window.location.reload();
  }

  return (
    <>
      <div className="flex">
        <button onClick={openModal} className="font-semibold">
          Edit Pin
        </button>
        {isModalOpen && (
          <EditProfileModal onClose={closeModal}>
            <PinForm
              title="Edit Pin"
              loading={loading}
              successful={successful}
              message={message}
              onSubmit={(values) => submitUpdatePin(values)}
              validationSchema={pinValidationSchema}
              initialValues={initialValues}
              isNewPin={true}
            />
          </EditProfileModal>
        )}
      </div>
    </>
  );
};

export default PinUpdate;
