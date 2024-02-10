import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cn } from "@/types/util";
import { PinFormProps } from "@/types/pin.types";
import { MyDropzone } from "./Pin.Dropzone";

const PinForm: React.FC<PinFormProps> = ({
  title,
  message,
  loading,
  successful,
  onSubmit,
  validationSchema,
  initialValues,
  isNewPin,
}) => {
  return (
    <div className="flex justify-center flex-col w-full h-[100%]">
      <h2 className="text-[20px] font-semibold text-left pl-6 pb-[25px] border-b border-inputBorder">
        {title}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty }) => (
          <Form className="flex w-full justify-center items-center mt-[80px]">
            {!successful && (
              <div>
                {message && (
                  <div>
                    <div className="mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
                      {message}
                    </div>
                  </div>
                )}
                <div className="flex gap-[30px]">
                  <div>
                    <label htmlFor="image"></label>
                    <Field
                      type="image"
                      id="image_url"
                      name="image_url"
                      component={MyDropzone}
                    />
                    <ErrorMessage
                      name="image_url"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="w-[550px]">
                    <div>
                      <label
                        className={`text-primaryTextColor block mb-[5px] text-[15px] font-light ${
                          !dirty && !isNewPin ? "opacity-50 cursor-auto" : ""
                        }`}
                        htmlFor="description"
                      >
                        Title
                      </label>
                      <Field
                        className={cn(`
                      "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem] h-[100px]",
                      "placeholder-gray-500 text-[0.9rem] font-light" ${"disabled:opacity-50 cursor-auto"}`)}
                        type="text"
                        id="title"
                        name="title"
                        disabled={!dirty && !isNewPin}
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className={`text-primaryTextColor block mb-[5px] text-[15px] font-light ${
                          !dirty && !isNewPin ? "opacity-50 cursor-auto" : ""
                        }`}
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        className={cn(
                          `
      sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 rounded-xl text-sm mb-[1.9rem] h-[120px]
    `,
                          "placeholder-gray-500 text-[0.9rem] font-light",
                          { "disabled:opacity-50 cursor-auto": !dirty }
                        )}
                        id="description"
                        name="description"
                        disabled={!dirty && !isNewPin}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label
                        className={`text-primaryTextColor block mb-[5px] text-[15px] font-light ${
                          !dirty && !isNewPin ? "opacity-50 cursor-auto" : ""
                        }`}
                        htmlFor="description"
                      >
                        Add a link
                      </label>
                      <Field
                        className={cn(`
                      "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem] h-[100px]",
                      "placeholder-gray-500 text-[0.9rem] font-light" ${"disabled:opacity-50 cursor-auto"}`)}
                        type="text"
                        id="link"
                        name="link"
                        disabled={!dirty && !isNewPin}
                      />
                      <ErrorMessage
                        name="link"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={!dirty}
                        className={`bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4 ${"disabled:opacity-50 cursor-auto"}`}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default PinForm;
