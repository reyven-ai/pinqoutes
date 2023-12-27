import React from "react";
import { signupValidationSchema } from "../../util/auth.validation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./Auth.Form";

const Register: React.FC = () => {
  const { handleRegister, message, successful } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <AuthForm
      title="Create your Pintech account"
      labelLink="Login"
      linkText="Already have an account?"
      linkTo="/login"
      successful={successful}
      message={message}
      onSubmit={handleRegister}
      validationSchema={signupValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default Register;
