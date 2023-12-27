import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { cn } from "../../util/util";
import { AuthFormProps } from "@/types/user.types";
import FooterAuth from "./Auth.Footer";

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  labelLink,
  linkText,
  linkTo,
  onSubmit,
  validationSchema,
  initialValues,
  message,
  successful,
}) => {
  return (
    <div className="flex">
      <div>
        <div className="bg-secondary flex items-center justify-center w-[550px] h-screen flex-col">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-header my[0.5rem] mx-0 text-[29px] font-semibold m-2.5">
                {title}
              </h2>
              <p className="text-primaryTextColor font-light text-[15px] m-0">
                {linkText}{" "}
                <Link
                  className="font-semibold underline decoration-2"
                  to={linkTo}
                >
                  {labelLink}
                </Link>
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="w-[470px] mt-8 ml-16 mr-16 max-[500px]:w-full">
                {!successful && (
                  <div>
                    {message && (
                      <div>
                        <div className="mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
                          {message}
                        </div>
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="email"
                        className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                      >
                        Your email address
                        <span className="text-textError ml-[4px]">*</span>
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                      >
                        Your password
                        <span className="text-textError ml-[4px]">*</span>
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className={cn(
                          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                          "placeholder-gray-500 text-[0.9rem] font-light"
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4"
                    >
                      {title === "Login" ? "Log in" : "Next"}
                    </button>
                  </div>
                )}
              </Form>
            </Formik>
            <FooterAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
