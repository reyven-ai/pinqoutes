// import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthSignUpForm from "./AuthSignUpForm";

function SignUp() {
  return (
    <div className="flex">
      <div>
        <div className="bg-secondary flex items-center justify-center w-[550px] h-screen flex-col">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-header my[0.5rem] mx-0 text-[29px] font-semibold m-2.5">
                Create your Pintech account
              </h2>
              <p className="color-primary font-light text-[15px] m-0">
                Already have an account?{" "}
                <Link
                  className="font-semibold underline decoration-2"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
            <AuthSignUpForm />
            <div className="text-center">
              <div className="inline-flex items-center">
                <div className="bg-border inline-block w-[140px] h-[1px] mx-2.5 my-0" />
                <strong className="text-text inline-block text-sm my-2 font-light">
                  Or sign up with
                </strong>
                <div className="bg-border inline-block w-[140px] h-[1px] mx-2.5 my-0" />
              </div>
            </div>
            <div className="flex mt-4 gap-3 w-full mb-4 ml-16 mr-16">
              <button
                type="button"
                className=" w-3/12 flex py-2 px-0 border-[1px] border-bborder justify-center rounded-[24px]"
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik0yMi41NiAxMi4yNWMwLS43OC0uMDctMS41My0uMi0yLjI1SDEydjQuMjZoNS45MmMtLjI2IDEuMzctMS4wNCAyLjUzLTIuMjEgMy4zMXYyLjc3aDMuNTdjMi4wOC0xLjkyIDMuMjgtNC43NCAzLjI4LTguMDl6IiBmaWxsPSIjNDI4NUY0Ii8+PHBhdGggZD0iTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzeiIgZmlsbD0iIzM0QTg1MyIvPjxwYXRoIGQ9Ik01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wN0gyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0LjkzbDIuODUtMi4yMi44MS0uNjJ6IiBmaWxsPSIjRkJCQzA1Ii8+PHBhdGggZD0iTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA3bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUzIDYuMTYtNC41M3oiIGZpbGw9IiNFQTQzMzUiLz48cGF0aCBkPSJNMSAxaDIydjIySDF6IiBmaWxsPSJub25lIi8+PC9zdmc+"
                  alt=""
                />
              </button>
              <button
                type="button"
                className="w-3/12 flex py-2 px-0 border-[1px] border-bborder justify-center rounded-[24px]"
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPjx0aXRsZT5pY19mYWNlYm9va19kZWZhdWx0PC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNMjIuNTgyIDBoLTIxLjI2M2MtLjcyOSAwLTEuMzE5LjU5MS0xLjMxOSAxLjMxOXYyMS4yNjNjMCAuNzI5LjU5IDEuMzE5IDEuMzE5IDEuMzE5aDExLjQ0N3YtOS4yNTZoLTMuMTE1di0zLjYwN2gzLjExNXYtMi42NmMwLTMuMDg3IDEuODg2LTQuNzY4IDQuNjM5LTQuNzY4IDEuMzE5IDAgMi40NTMuMDk4IDIuNzgzLjE0MnYzLjIyNmwtMS45MS4wMDFjLTEuNDk4IDAtMS43ODguNzEyLTEuNzg4IDEuNzU2djIuMzAzaDMuNTcybC0uNDY1IDMuNjA3aC0zLjEwN3Y5LjI1Nmg2LjA5MWMuNzI5IDAgMS4zMTktLjU5MSAxLjMxOS0xLjMxOXYtMjEuMjYzYzAtLjcyOS0uNTkxLTEuMzE5LTEuMzE5LTEuMzE5IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiBmaWxsPSIjM0I1OTk4Ii8+PC9zdmc+"
                  alt=""
                />
              </button>
              <button
                type="button"
                className="w-3/12 flex py-2 px-0 border-[1px] border-bborder justify-center rounded-[24px]"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxOCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljk2MzEgMTEuNjkwNEMxNC45MzU0IDguOTAzNjEgMTcuMjM1NiA3LjU2NzAxIDE3LjMzODQgNy40OTk1M0MxNi4wNDU3IDUuNjA5MzIgMTQuMDMxNyA1LjM0OTk2IDEzLjMxNDggNS4zMjA0NEMxMS42MDIyIDUuMTQ2NSA5Ljk3MTM0IDYuMzI5MjcgOS4xMDI0NiA2LjMyOTI3QzguMjM1MzkgNi4zMjkyNyA2Ljg5MyA1LjM0NTkzIDUuNDcyNzkgNS4zNzA5OEMzLjYwNDUyIDUuMzk4NyAxLjg4MjQ2IDYuNDU3NiAwLjkyMTA0MiA4LjEyOTk5Qy0xLjAxOTIzIDExLjQ5NTkgMC40MjQ2ODIgMTYuNDg0MSAyLjMxNTMyIDE5LjIxNThDMy4yMzk2MiAyMC41NTExIDQuMzQxOSAyMi4wNTM2IDUuNzg4MDUgMjEuOTk4NUM3LjE4MTg3IDIxLjk0MzUgNy43MDc3MiAyMS4wOTcxIDkuMzkyNjkgMjEuMDk3MUMxMS4wNzc3IDIxLjA5NzEgMTEuNTUwOCAyMS45OTg1IDEzLjAyNTEgMjEuOTcwNEMxNC41MjM5IDIxLjk0MzEgMTUuNDc0MiAyMC42MDk2IDE2LjM5MDkgMTkuMjY5MUMxNy40NTIxIDE3LjcxNzggMTcuODg5IDE2LjIxNTggMTcuOTE0OSAxNi4xMzk3QzE3Ljg4MjIgMTYuMTI0NiAxNC45OTMgMTUuMDE3OCAxNC45NjMxIDExLjY5MDRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTIuMTkyOSAzLjUxMjUyQzEyLjk1OTggMi41ODE1MiAxMy40Nzk0IDEuMjg3ODUgMTMuMzM4MSAwQzEyLjIzMTMgMC4wNDQ3MTcxIDEwLjg5MTYgMC43MzU1OTUgMTAuMDk3IDEuNjY1NzFDOS4zODUwNyAyLjQ5MTE5IDguNzYyNiAzLjgwNTQyIDguOTI5NDQgNS4wNzAwMkMxMC4xNjQxIDUuMTY1NzEgMTEuNDIzMyA0LjQ0MTc0IDEyLjE5MjkgMy41MTI1MloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
                  alt=""
                />
              </button>
            </div>
            <div>
              <p className="text-text text-[15px] text-center font-light my-[5px] mx-0">
                By signing up, I agree to pinterest{" "}
                <Link className="font-semibold underline decoration-2" to="/">
                  terms & conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <ResponsiveImageGrid /> */}
    </div>
  );
}

export default SignUp;
