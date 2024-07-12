import React from "react";
import { PinFormInput } from "@/types/pin.types";
import { usePinAction } from "@/hooks/usePinAction";
import { pinValidationSchema } from "@/validations/pin.validation";
import PinForm from "./Pin.Form";

const PinCreate: React.FC = () => {
  const { handleCreatePin, message, successful, loading } = usePinAction();
  const initialValues: PinFormInput = {
    title: "",
    description: "",
    link: "",
    file_url: "",
  };

  return (
    <>
      <div className="flex mt-[3rem] w-[82%] ml-[17.5rem]">
        <PinForm
          title="Create"
          loading={loading}
          successful={successful}
          message={message}
          onClose={close}
          onSubmit={handleCreatePin}
          validationSchema={pinValidationSchema}
          initialValues={initialValues}
        />
      </div>
    </>
  );
};

export default PinCreate;
