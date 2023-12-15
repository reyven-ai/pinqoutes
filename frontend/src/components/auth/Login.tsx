import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "./auth.validation";
import InfoWarning from "@material-ui/icons/ErrorOutlineOutlined";
import { icon } from "../icons/iconStyles";
import { cn } from "../util/util";
import { useAuth } from "@/hooks/useAuth";

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
            <div className="text-center">
              <div className="inline-flex items-center">
                <div className="bg-inputBorder inline-block w-[140px] h-[1px] mx-2.5 my-0" />
                <strong className="text-primaryTextColor inline-block text-sm my-2 font-light">
                  Or sign up with
                </strong>
                <div className="bg-inputBorder inline-block w-[140px] h-[1px] mx-2.5 my-0" />
              </div>
            </div>
            <div className="flex-column text-center mt-4 gap-3 m-[auto] w-[460px]">
              <button
                type="button"
                className="w-[80%] m-[auto] justify-center flex py-2 px-0 border-[1px] socialButtonBorder rounded-[24px] mb-2"
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik0yMi41NiAxMi4yNWMwLS43OC0uMDctMS41My0uMi0yLjI1SDEydjQuMjZoNS45MmMtLjI2IDEuMzctMS4wNCAyLjUzLTIuMjEgMy4zMXYyLjc3aDMuNTdjMi4wOC0xLjkyIDMuMjgtNC43NCAzLjI4LTguMDl6IiBmaWxsPSIjNDI4NUY0Ii8+PHBhdGggZD0iTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzeiIgZmlsbD0iIzM0QTg1MyIvPjxwYXRoIGQ9Ik01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wN0gyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0LjkzbDIuODUtMi4yMi44MS0uNjJ6IiBmaWxsPSIjRkJCQzA1Ii8+PHBhdGggZD0iTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA3bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUzIDYuMTYtNC41M3oiIGZpbGw9IiNFQTQzMzUiLz48cGF0aCBkPSJNMSAxaDIydjIySDF6IiBmaWxsPSJub25lIi8+PC9zdmc+"
                  alt=""
                />
              </button>
              <button
                type="button"
                className="w-[80%] m-[auto] flex py-2 px-0 border-[1px] socialButtonBorder justify-center rounded-[24px]"
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPjx0aXRsZT5pY19mYWNlYm9va19kZWZhdWx0PC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNMjIuNTgyIDBoLTIxLjI2M2MtLjcyOSAwLTEuMzE5LjU5MS0xLjMxOSAxLjMxOXYyMS4yNjNjMCAuNzI5LjU5IDEuMzE5IDEuMzE5IDEuMzE5aDExLjQ0N3YtOS4yNTZoLTMuMTE1di0zLjYwN2gzLjExNXYtMi42NmMwLTMuMDg3IDEuODg2LTQuNzY4IDQuNjM5LTQuNzY4IDEuMzE5IDAgMi40NTMuMDk4IDIuNzgzLjE0MnYzLjIyNmwtMS45MS4wMDFjLTEuNDk4IDAtMS43ODguNzEyLTEuNzg4IDEuNzU2djIuMzAzaDMuNTcybC0uNDY1IDMuNjA3aC0zLjEwN3Y5LjI1Nmg2LjA5MWMuNzI5IDAgMS4zMTktLjU5MSAxLjMxOS0xLjMxOXYtMjEuMjYzYzAtLjcyOS0uNTkxLTEuMzE5LTEuMzE5LTEuMzE5IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiBmaWxsPSIjM0I1OTk4Ii8+PC9zdmc+"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
