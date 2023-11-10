import { useState, ChangeEvent } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useSignUp, useLogin } from "./useApis";
// import { AuthFormProps } from "@/models/types";

// export const useAuthForm = (): AuthFormProps => {
export const useAuthForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<string>("");
  const [passwordWarning, setPasswordWarning] = useState<string>("");
  const [emailInUseWarning, setEmailInUseWarning] = useState<string>("");
  const [invalid, setInvalidWarning] = useState<string>("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const signUpMutation = useSignUp();
  const logInMutation = useLogin();

  const validateEmail = (email: string): boolean => validator.isEmail(email);
  const validatePassword = (password: string): boolean =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    validatorFn: (value: string) => boolean,
    setWarning: React.Dispatch<React.SetStateAction<string>>
  ): string => {
    const inputValue: string = e.target.value.trim();
    if (inputValue === "") {
      setWarning("Please fill this field.");
    } else if (validatorFn(inputValue)) {
      setWarning("");
    } else {
      setWarning(`${e.target.name}`);
    }
    return inputValue;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(handleInputChange(e, validateEmail, setEmailWarning));

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setPassword(handleInputChange(e, validatePassword, setPasswordWarning));

  const handleSignUp = async (): Promise<void> => {
    const emailValue: string = handleInputChange(
      {
        target: { value: email, name: "Please enter a valid email address." },
      } as ChangeEvent<HTMLInputElement>,
      validateEmail,
      setEmailWarning
    );
    const passwordValue: string = handleInputChange(
      {
        target: {
          value: password,
          name: "Password must be strong and alteast 8 characters.",
        },
      } as ChangeEvent<HTMLInputElement>,
      validatePassword,
      setPasswordWarning
    );

    if (emailValue && passwordValue) {
      try {
        const data = await signUpMutation.mutateAsync({
          email: emailValue,
          password: passwordValue,
        });
        setIsSignUpSuccess(true);
        setTimeout(() => {
          console.log("Sign up successful:", data);
          navigate("/profile");
        }, 1500);
      } catch (error) {
        if (error.message === "Email is already registered") {
          setEmailInUseWarning("Sorry, that email is already taken.");
        } else {
          console.error("Sign up failed:", error);
        }
      }
    }
  };

  const handleLogin = async (): Promise<void> => {
    const emailValue: string = handleInputChange(
      {
        target: { value: email, name: "" },
      } as ChangeEvent<HTMLInputElement>,
      validateEmail,
      setEmailWarning
    );
    const passwordValue: string = handleInputChange(
      {
        target: { value: password, name: "" },
      } as ChangeEvent<HTMLInputElement>,
      validatePassword,
      setPasswordWarning
    );

    if (emailValue && passwordValue) {
      try {
        const data = await logInMutation.mutateAsync({
          email: emailValue,
          password: passwordValue,
        });
        setTimeout(() => {
          console.log("Login successful:", data);
          navigate("/home");
        }, 2000);
      } catch (error) {
        if (
          error.message === "Incorrect password" ||
          error.message === "Email not found"
        ) {
          setInvalidWarning("Sorry, that email or password didn't work");
          console.error("Login failed:", error);
        } else {
          console.error("An error occurred during login:", error);
        }
      }
    }
  };

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (email.trim() !== "") {
        document.getElementById("passwordInput")?.focus();
      } else {
        document.getElementById("nextButton")?.click();
        event.preventDefault();
      }
    }
  };

  const handlePasswordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (password.trim() !== "") {
        document.getElementById("nextButton")?.click();
      } else {
        event.preventDefault();
      }
    }
  };

  return {
    showPassword,
    email,
    password,
    emailWarning,
    passwordWarning,
    emailInUseWarning,
    invalid,
    isSignUpSuccess,
    setShowPassword,
    handleEmailKeyDown,
    handlePasswordKeyDown,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleLogin,
  };
};
