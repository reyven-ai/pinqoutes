import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { cn } from "../../types/util";
import { ProfileFormProps } from "@/types/profile.types";
import {
  BirthDays,
  BirthMonths,
  CountryCodes,
  CountryResidence,
} from "./Profile.FormOptions";
import { ErrorOutline } from "@material-ui/icons";
import { ProfilePic } from "./Profile.Picture";

const fontSize = "20px";

const ProfileForm: React.FC<ProfileFormProps> = ({
  title,
  message,
  loading,
  successful,
  onSubmit,
  validationSchema,
  initialValues,
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center lg:w-[550px] xs:w-full lg:mt-[1rem] xs:mt-[1.5rem] flex-col xs:m-3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ dirty }) => (
            <Form className="lg:w-[500px] xs:w-[full] lg:mt-8 xs:mt-2">
              {!successful && (
                <div>
                  {message && (
                    <div>
                      <div className="mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
                        {message}
                      </div>
                    </div>
                  )}
                  <h2 className="text-[18px] text-center mb-[2rem]">{title}</h2>
                  <div className="flex item-center justify-center">
                    <label htmlFor="image"></label>
                    <Field
                      type="img"
                      id="profile_picture_url"
                      name="profile_picture_url"
                      component={ProfilePic}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                    >
                      Username
                      <span className="text-textError ml-[4px]">*</span>
                    </label>
                    <Field
                      id="username"
                      name="username"
                      placeholder="reyven-ai"
                      disabled={loading}
                      type="text"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    />
                    <ErrorMessage name="username">
                      {(msg) => (
                        <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center flex gap-[8px]">
                          <ErrorOutline style={{ fontSize: fontSize }} />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                    >
                      Description
                      <span className="text-textError ml-[4px]">*</span>
                    </label>
                    <Field
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Software Developer"
                      disabled={loading}
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    />
                    <ErrorMessage name="description">
                      {(msg) => (
                        <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center flex gap-[8px]">
                          <ErrorOutline style={{ fontSize: fontSize }} />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label
                      htmlFor="country_of_residence"
                      className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                    >
                      Country of Residence
                      <span className="text-textError ml-[4px]">*</span>
                    </label>
                    <Field
                      as="select"
                      id="country_of_residence"
                      name="country_of_residence"
                      disabled={loading}
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    >
                      <CountryResidence />
                    </Field>
                    <ErrorMessage
                      name="country_of_residence"
                      component="div"
                      className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                    >
                      Date of Birth
                      <span className="text-textError ml-[4px]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <Field
                        disabled={loading}
                        id="birth_day"
                        name="birth_day"
                        type="number"
                        as="select"
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[50%] p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      >
                        <BirthDays />
                      </Field>
                      <Field
                        id="date"
                        as="select"
                        name="birth_month"
                        type="text"
                        disabled={loading}
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      >
                        <BirthMonths />
                      </Field>
                      <Field
                        id="birth_year"
                        name="birth_year"
                        type="number"
                        placeholder="YYYY"
                        disabled={loading}
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[80%] p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                    >
                      Mobile Phone Number
                      <span className="text-textError ml-[4px]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <Field
                        as="select"
                        name="mobile_phone_number_prefix"
                        id="mobile_phone_number_prefix"
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[50%] lg:p-4 xs:p-2 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 font-light"
                        )}
                      >
                        <CountryCodes />
                      </Field>
                      <Field
                        id="mobile_phone_number"
                        name="mobile_phone_number"
                        placeholder="53545033"
                        disabled={loading}
                        type="text"
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      />
                    </div>
                    <ErrorMessage name="mobile_phone_number">
                      {(msg) => (
                        <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center flex gap-[8px]">
                          <ErrorOutline style={{ fontSize: fontSize }} />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <button
                    type="submit"
                    disabled={!dirty}
                    className={`bg-[#000] text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4 ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "disabled:opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
