import React from "react";
import PinForm from "./Pin.Form";
import { PinFormInput } from "@/types/pin.types";
import { usePinAction } from "@/hooks/usePinAction";
import { pinValidationSchema } from "@/validations/pin.validation";

const PinCreate: React.FC = () => {
  const { handleCreatePin, message, successful, loading } = usePinAction();
  const initialValues: PinFormInput = {
    title: "",
    description: "",
    link: "",
    image_url: "",
  };

  return (
    <>
      <div className="flex mt-20">
        <PinForm
          title="Create Pin"
          loading={loading}
          successful={successful}
          message={message}
          onSubmit={handleCreatePin}
          validationSchema={pinValidationSchema}
          initialValues={initialValues}
        />
      </div>
    </>
  );
};

export default PinCreate;
