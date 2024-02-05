import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { cn } from "../../types/util";
import { AuthFormProps } from "@/types/user.types";
import FooterAuth from "./Auth.Footer";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";

const fontSize = "20px";

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
  loading,
  button,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex items-center justify-center mt-[3rem] flex-col">
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
              <Form className="w-[500px] mt-8 ml-16 mr-16 max-[500px]:w-full">
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
                        // type="email"
                        disabled={loading}
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

                    <div className="relative">
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
                        // required
                        type={showPassword ? "text" : "password"}
                        disabled={loading}
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
                      <button
                        className="cursor-pointer bg-transparent border-none text-gray-700 font-normal absolute left-[92%] top-2/3 transform -translate-y-1/2"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined
                            style={{ fontSize: fontSize }}
                          />
                        ) : (
                          <VisibilityOutlined style={{ fontSize: fontSize }} />
                        )}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4"
                    >
                      {loading ? "Loading..." : button}
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
