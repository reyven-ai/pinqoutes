// import { useState } from "react";
// import validator from "validator";
// import { useNavigate } from "react-router-dom";
// import { useSignUp, useLogin } from "./useAuthApis";

// export const useAuthForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailWarning, setEmailWarning] = useState("");
//   const [passwordWarning, setPasswordWarning] = useState("");
//   const [emailInUseWarning, setEmailInUseWarning] = useState("");
//   const [invalid, setInvalidWarning] = useState("");

//   const navigate = useNavigate();
//   const signUpMutation = useSignUp();
//   const logInMutation = useLogin();

//   const validateEmail = (email: string): boolean => {
//     return validator.isEmail(email);
//   };

//   const validatePassword = (password: string): boolean => {
//     if (
//       password.length < 8 ||
//       !/[A-Z]/.test(password) ||
//       !/\d/.test(password)
//     ) {
//       return false;
//     }
//     return true;
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputEmail = e.target.value;
//     setEmail(inputEmail);

//     if (validateEmail(inputEmail)) {
//       setEmailWarning("");
//     }
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputPassword = e.target.value;
//     setPassword(inputPassword);

//     if (validatePassword(inputPassword)) {
//       setPasswordWarning("");
//     }
//   };

//   const handleSignUp = async () => {
//     if (!validateEmail(email)) {
//       setEmailWarning("Please enter a valid email address.");
//       // return;
//     }

//     if (!validatePassword(password)) {
//       setPasswordWarning("Password must be at least 8 characters long");
//       // return;
//     }

//     signUpMutation
//       .mutateAsync({ email, password })
//       .then((data) => {
//         setTimeout(() => {
//           console.log("Sign up successful:", data);
//           navigate("/profile");
//         }, 2000);
//       })
//       .catch((error) => {
//         if (error.message === "Email is already registered") {
//           setEmailInUseWarning("Sorry, that email is already taken.");
//         } else {
//           console.error("Sign up failed:", error);
//         }
//       });
//   };

//   const handleLogin = async () => {
//     if (!validateEmail(email)) {
//       setEmailWarning("Please fill this field");
//       // return;
//     }

//     if (!validatePassword(password)) {
//       setPasswordWarning("Please, fill this field");
//       // return;
//     }

//     logInMutation
//       .mutateAsync({ email, password })
//       .then((data) => {
//         setTimeout(() => {
//           console.log("Login successful:", data);
//           navigate("/home");
//         }, 2000);
//       })
//       .catch((error) => {
//         if (
//           error.message === "Incorrect password" ||
//           error.message === "Email not found"
//         ) {
//           setInvalidWarning("Sorry, that email or password didn't work");
//           console.error("Login failed:", error);
//         } else {
//           console.error("An error occurred during login:", error);
//         }
//       });
//   };

//   return {
//     showPassword,
//     email,
//     password,
//     emailWarning,
//     passwordWarning,
//     emailInUseWarning,
//     invalid,
//     setShowPassword,
//     handleEmailChange,
//     handlePasswordChange,
//     handleSignUp,
//     handleLogin,
//   };
// };
import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useSignUp, useLogin } from "./useAuthApis";

export const useAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [emailInUseWarning, setEmailInUseWarning] = useState("");
  const [invalid, setInvalidWarning] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false); // State to track signup success

  const navigate = useNavigate();
  const signUpMutation = useSignUp();
  const logInMutation = useLogin();

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  const validatePassword = (password: string): boolean => {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return false;
    }
    return true;
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
      setEmailWarning("Please enter a valid email address");
      // return;
    }

    if (!validatePassword(password)) {
      setPasswordWarning("Password must be at least 8 characters long");
      // return;
    }

    signUpMutation
      .mutateAsync({ email, password })
      .then((data) => {
        setTimeout(() => {
          console.log("Sign up successful:", data);
          setIsSignUpSuccess(true); // Set signup success state to true
          navigate("/profile");
        }, 2000);
      })
      .catch((error) => {
        if (error.message === "Email is already registered") {
          setEmailInUseWarning("Sorry, that email is already taken.");
        } else {
          console.error("Sign up failed:", error);
        }
      });
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailWarning("Please fill this field");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordWarning("Please, fill this field");
      return;
    }

    logInMutation
      .mutateAsync({ email, password })
      .then((data) => {
        setTimeout(() => {
          console.log("Login successful:", data);
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.message === "Incorrect password" ||
          error.message === "Email not found"
        ) {
          setInvalidWarning("Sorry, that email or password didn't work");
          console.error("Login failed:", error);
        } else {
          console.error("An error occurred during login:", error);
        }
      });
  };

  return {
    showPassword,
    email,
    password,
    emailWarning,
    passwordWarning,
    emailInUseWarning,
    invalid,
    isSignUpSuccess, // Pass the signup success state
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleLogin,
  };
};
