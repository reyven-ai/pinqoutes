import React from "react";
import { loginValidationSchema } from "../../validations/auth.validation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./Auth.Form";

const Login: React.FC = () => {
  const { handleLogin, message, successful, loading } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <AuthForm
      title="Welcome back!"
      labelLink="Signup"
      linkText="New to Pint?"
      linkTo="/signup"
      button="Log in"
      loading={loading}
      successful={successful}
      message={message}
      onSubmit={handleLogin}
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default Login;
