import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import InfoWarning from "@material-ui/icons/ErrorOutlineOutlined";
import Errors from "@material-ui/icons/CloseRounded";
import styled from "styled-components";
import { SignUpProps } from "@/models/types";
// import ResponsiveImageGrid from "./AuthBackground";
import { useSignUp } from "@/hooks/useAuth";

const icon = {
  fontSize: "17px",
  alignItem: "center",
  marginRight: "3px",
  marginBottom: "2px",
};

const Failed = {
  fontSize: "32px",
  backgroundColor: "rgb(168, 32, 13)",
  color: "white",
  borderRadius: "50%",
  fontWeight: "300",
  padding: "0.3rem",
  marginRight: "10px",
};

const MainContainer = styled.div`
  @media (max-width: 600px) {
    display: block;
  }
`;

const Background = styled.div`
  background-color: #fefefe;

  @media (max-width: 600px) {
    width: 100%;
    /* padding: 0 0.7rem; */
    margin-left: 0;
    margin-right: 0;
  }
  strong {
    color: rgb(69, 71, 69);
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
`;

const Container = styled.div`
  @media (max-width: 600px) {
    width: 95%;
  }
  animation: fadeInLeft 0.5s ease-in-out;
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-205px);
    }
    100% {
      opacity: 7;
      transform: translateX(0);
    }
  }
`;

const Header = styled.div`
  color: #333;
  p {
    color: rgb(69, 71, 69);
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
`;

const Title = styled.h2`
  color: #333;
  margin: 0.5rem 0;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 24px;
  }
`;

const StyledForm = styled.form`
  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0rem;
    margin-left: 0rem;
  }
`;

const StyledLabel = styled.label`
  font-family: "Quicksand", sans-serif;
  color: rgb(69, 71, 69);

  @media (max-width: 600px) {
    font-size: 14px;
  }

  span {
    margin-left: 4px;
    color: rgb(230, 0, 35);
  }
`;

const StyledInput = styled.input`
  border: 1px solid #868685;
  background-color: transparent;
  color: rgb(69, 71, 69);
  font-family: "Quicksand", sans-serif;

  @media (max-width: 600px) {
    padding: 0.8rem 0.8rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonWrapper = styled.p`
  @media (max-width: 600px) {
    flex-direction: column;
  }
  button {
    padding: 0.5rem 0rem;
    width: 100%;
    border: 1px solid #0e0f0c1f;
    justify-content: center;
    display: flex;
    border-radius: 24px;
  }
`;

const SignUpButton = styled.button`
  background-color: rgb(61, 145, 253);
  color: #fff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;

  @media (max-width: 600px) {
    padding: 0.6rem 0;
  }

  &:hover {
    background-color: #ff3c1a;
  }
`;

const FbButton = styled.button`
  &:hover {
    background-color: #ff3c1a;
  }
`;

const AppleButton = styled.button`
  &:hover {
    background-color: #ff3c1a;
  }
`;

const GoogleButton = styled.button`
  &:hover {
    background-color: #ff3c1a;
  }
`;

const Content = styled.div`
  p {
    color: rgb(69, 71, 69);
    font-size: 15px;
    margin: 5px 0;
    text-align: center;
    font-weight: 300;

    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
  margin-top: 1.5rem;
`;

const PasswordContainer = styled.div``;

const ShowPasswordButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  transform: translateY(-50%);
`;

const WarningMessage = styled.p`
  color: #ea0303;
  margin-top: -20px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const EmailAlreadyTaken = styled.p`
  background-color: rgba(22, 51, 0, 0.08);
  color: rgb(69, 71, 69);
  margin-top: -1rem;

  @media (max-width: 600px) {
    font-size: 15px;
    padding: 1rem;
  }
`;

const Line = styled.div`
  background-color: #868685;
  @media (max-width: 600px) {
    width: 85px;
  }
`;
const Containers = styled.div`
  text-align: center;
`;

const Text = styled.strong``;

const LineContainer = styled.div``;

const SignUp: React.FC<SignUpProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [emailInUseWarning, setEmailInUseWarning] = useState("");

  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const validateEmail = (email: string): boolean => {
    return email.endsWith("@gmail.com");
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (validateEmail(inputEmail)) {
      setEmailWarning("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (validatePassword(inputPassword)) {
      setPasswordWarning("");
    }
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setEmailWarning("Please enter a valid email address.");
    }
    if (!validatePassword(password)) {
      setPasswordWarning("Password must be at least 8 characters long");
    }

    signUpMutation
      .mutateAsync({ email, password }) // Use the mutation function
      .then((data) => {
        setTimeout(() => {
          console.log("Sign up successful:", data);
          navigate("/profile");
        }, 2000);
      })
      .catch((error) => {
        if (
          error instanceof Error &&
          error.message === "Email is already registered."
        ) {
          setEmailInUseWarning("Sorry, that email is already taken.");
        } else {
          console.error("Sign up failed:", error);
        }
      });
  };

  return (
    <MainContainer className="flex">
      <div>
        <Background className="flex items-center justify-center w-[550px] h-screen flex-col">
          <Container>
            <Header className="text-center mb-6">
              <Title className="text-[29px] font-semibold m-2.5">
                Create your Pintech account
              </Title>
              <p className="font-light text-[15px] m-0">
                Already have an account?{" "}
                <Link
                  className="font-semibold underline decoration-2"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </Header>
            <StyledForm action="" className="w-[470px] mt-8 mb-8 ml-16 mr-16">
              {emailInUseWarning && (
                <EmailAlreadyTaken className="text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
                  <Errors style={Failed} />
                  {emailInUseWarning}
                </EmailAlreadyTaken>
              )}
              <StyledLabel
                htmlFor="email"
                className="block mb-[3px] text-[15px] font-light"
              >
                Your email address<span>*</span>
              </StyledLabel>
              <StyledInput
                className="block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]"
                type="email"
                // placeholder="name@gmail.com"
                value={email}
                onChange={handleEmailChange}
                style={{
                  border:
                    emailWarning || emailInUseWarning ? "2px solid red" : "",
                }}
              />
              {emailWarning && (
                <WarningMessage className="text-[15px] font-light mb-5 items-center">
                  <InfoWarning style={icon} /> {emailWarning}
                </WarningMessage>
              )}
              <StyledLabel
                htmlFor="email"
                className="block mb-[3px] text-[15px] font-light"
              >
                Your password<span>*</span>
              </StyledLabel>
              <PasswordContainer className="relative">
                <StyledInput
                  className="block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  // placeholder="Password"
                  onChange={handlePasswordChange}
                  style={{ border: passwordWarning ? "2px solid red" : "" }}
                />
                {passwordWarning && (
                  <WarningMessage className="text-[15px] font-light mb-5 items-center">
                    <InfoWarning style={icon} /> {passwordWarning}
                  </WarningMessage>
                )}
                <ShowPasswordButton
                  className="absolute cursor-pointer font-light left-[93%] top-[50%] z-1"
                  style={{ top: passwordWarning ? "30%" : "" }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                >
                  {showPassword ? (
                    <VisibilityOff style={icon} />
                  ) : (
                    <Visibility style={icon} />
                  )}
                </ShowPasswordButton>
              </PasswordContainer>
              <SignUpButton
                className="cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4"
                type="button"
                onClick={handleSignUp}
              >
                Next
              </SignUpButton>
              <Containers>
                <LineContainer className="inline-flex items-center">
                  <Line className="inline-block w-[140px] h-[1px] mx-2.5 my-0" />
                  <Text className="inline-block text-sm my-2 font-light">
                    Or sign up with
                  </Text>
                  <Line className="inline-block w-[140px] h-[1px] mx-2.5 my-0" />
                </LineContainer>
              </Containers>
              <ButtonWrapper className="flex mt-4 w-full gap-3">
                <GoogleButton type="button">
                  <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik0yMi41NiAxMi4yNWMwLS43OC0uMDctMS41My0uMi0yLjI1SDEydjQuMjZoNS45MmMtLjI2IDEuMzctMS4wNCAyLjUzLTIuMjEgMy4zMXYyLjc3aDMuNTdjMi4wOC0xLjkyIDMuMjgtNC43NCAzLjI4LTguMDl6IiBmaWxsPSIjNDI4NUY0Ii8+PHBhdGggZD0iTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzeiIgZmlsbD0iIzM0QTg1MyIvPjxwYXRoIGQ9Ik01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wN0gyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0LjkzbDIuODUtMi4yMi44MS0uNjJ6IiBmaWxsPSIjRkJCQzA1Ii8+PHBhdGggZD0iTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA3bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUzIDYuMTYtNC41M3oiIGZpbGw9IiNFQTQzMzUiLz48cGF0aCBkPSJNMSAxaDIydjIySDF6IiBmaWxsPSJub25lIi8+PC9zdmc+"
                    alt=""
                  />
                </GoogleButton>
                <FbButton type="button">
                  <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPjx0aXRsZT5pY19mYWNlYm9va19kZWZhdWx0PC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNMjIuNTgyIDBoLTIxLjI2M2MtLjcyOSAwLTEuMzE5LjU5MS0xLjMxOSAxLjMxOXYyMS4yNjNjMCAuNzI5LjU5IDEuMzE5IDEuMzE5IDEuMzE5aDExLjQ0N3YtOS4yNTZoLTMuMTE1di0zLjYwN2gzLjExNXYtMi42NmMwLTMuMDg3IDEuODg2LTQuNzY4IDQuNjM5LTQuNzY4IDEuMzE5IDAgMi40NTMuMDk4IDIuNzgzLjE0MnYzLjIyNmwtMS45MS4wMDFjLTEuNDk4IDAtMS43ODguNzEyLTEuNzg4IDEuNzU2djIuMzAzaDMuNTcybC0uNDY1IDMuNjA3aC0zLjEwN3Y5LjI1Nmg2LjA5MWMuNzI5IDAgMS4zMTktLjU5MSAxLjMxOS0xLjMxOXYtMjEuMjYzYzAtLjcyOS0uNTkxLTEuMzE5LTEuMzE5LTEuMzE5IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiBmaWxsPSIjM0I1OTk4Ii8+PC9zdmc+"
                    alt=""
                  />
                </FbButton>
                <AppleButton type="button">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxOCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljk2MzEgMTEuNjkwNEMxNC45MzU0IDguOTAzNjEgMTcuMjM1NiA3LjU2NzAxIDE3LjMzODQgNy40OTk1M0MxNi4wNDU3IDUuNjA5MzIgMTQuMDMxNyA1LjM0OTk2IDEzLjMxNDggNS4zMjA0NEMxMS42MDIyIDUuMTQ2NSA5Ljk3MTM0IDYuMzI5MjcgOS4xMDI0NiA2LjMyOTI3QzguMjM1MzkgNi4zMjkyNyA2Ljg5MyA1LjM0NTkzIDUuNDcyNzkgNS4zNzA5OEMzLjYwNDUyIDUuMzk4NyAxLjg4MjQ2IDYuNDU3NiAwLjkyMTA0MiA4LjEyOTk5Qy0xLjAxOTIzIDExLjQ5NTkgMC40MjQ2ODIgMTYuNDg0MSAyLjMxNTMyIDE5LjIxNThDMy4yMzk2MiAyMC41NTExIDQuMzQxOSAyMi4wNTM2IDUuNzg4MDUgMjEuOTk4NUM3LjE4MTg3IDIxLjk0MzUgNy43MDc3MiAyMS4wOTcxIDkuMzkyNjkgMjEuMDk3MUMxMS4wNzc3IDIxLjA5NzEgMTEuNTUwOCAyMS45OTg1IDEzLjAyNTEgMjEuOTcwNEMxNC41MjM5IDIxLjk0MzEgMTUuNDc0MiAyMC42MDk2IDE2LjM5MDkgMTkuMjY5MUMxNy40NTIxIDE3LjcxNzggMTcuODg5IDE2LjIxNTggMTcuOTE0OSAxNi4xMzk3QzE3Ljg4MjIgMTYuMTI0NiAxNC45OTMgMTUuMDE3OCAxNC45NjMxIDExLjY5MDRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTIuMTkyOSAzLjUxMjUyQzEyLjk1OTggMi41ODE1MiAxMy40Nzk0IDEuMjg3ODUgMTMuMzM4MSAwQzEyLjIzMTMgMC4wNDQ3MTcxIDEwLjg5MTYgMC43MzU1OTUgMTAuMDk3IDEuNjY1NzFDOS4zODUwNyAyLjQ5MTE5IDguNzYyNiAzLjgwNTQyIDguOTI5NDQgNS4wNzAwMkMxMC4xNjQxIDUuMTY1NzEgMTEuNDIzMyA0LjQ0MTc0IDEyLjE5MjkgMy41MTI1MloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
                    alt=""
                  />
                </AppleButton>
              </ButtonWrapper>
              <Content>
                <p>
                  By signing up, I agree to pinterest{" "}
                  <Link
                    className="font-semibold underline decoration-2"
                    to="/login"
                  >
                    terms & conditions
                  </Link>
                </p>
              </Content>
            </StyledForm>
          </Container>
        </Background>
      </div>
      {/* <ResponsiveImageGrid /> */}
    </MainContainer>
  );
};

export default SignUp;
