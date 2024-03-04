import React from "react";
import { signupValidationSchema } from "../../validations/auth.validation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./Auth.Form";

const Register: React.FC = () => {
  const { handleRegister, message, successful, loading } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <AuthForm
      title="Create your PinTech account"
      labelLink="Login"
      linkText="Already have an account?"
      footerText="Or sign up with"
      linkTo="/login"
      button="Next"
      loading={loading}
      successful={successful}
      message={message}
      onSubmit={handleRegister}
      validationSchema={signupValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default Register;
