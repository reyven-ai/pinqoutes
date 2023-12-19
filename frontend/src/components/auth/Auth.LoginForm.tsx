import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "./auth.validation";
import InfoWarning from "@material-ui/icons/ErrorOutlineOutlined";
import { icon } from "../icons/iconStyles";
import { cn } from "../util/util";
import { useAuth } from "@/hooks/useAuth";
import FooterAuth from "./Auth.Footer";

const LoginForm: React.FC = () => {
  const { handleLogin, message, successful } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="flex">
      <div>
        <div className="bg-secondary flex items-center justify-center w-[550px] h-screen flex-col">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-header my[0.5rem] mx-0 text-[29px] font-semibold m-2.5">
                Welcome back!
              </h2>
              <p className="text-primaryTextColor font-light text-[15px] m-0">
                New to Pint?{" "}
                <Link
                  className="font-semibold underline decoration-2"
                  to={"/signup"}
                >
                  Sign up
                </Link>
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
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
                        component={({ children }) => (
                          <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center">
                            <InfoWarning
                              style={icon}
                              className="items-center mr-[7px] mb-[2px]"
                            />
                            {children}
                          </div>
                        )}
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
                        name="password"
                        component={({ children }) => (
                          <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center">
                            <InfoWarning
                              style={icon}
                              className="items-center mr-[7px] mb-[2px]"
                            />
                            {children}
                          </div>
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4 ${
                        successful ? "opacity-75" : ""
                      }`}
                    >
                      Log in
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

export default LoginForm;
