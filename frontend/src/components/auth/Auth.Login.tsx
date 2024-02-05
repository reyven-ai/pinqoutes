import React, { useState } from "react";
import { loginValidationSchema } from "../../validations/auth.validation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./Auth.Form";

const Login: React.FC = () => {
  const { handleLogin, message, successful, loading } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };
  const [showReminder, setShowReminder] = useState(true);

  const handleCloseReminder = () => {
    setShowReminder(false);
  };

  const reminderMessage = (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center">
        <p className="mb-4">
          This website is not completely finished yet. You can use it, but some
          features may still be under development.
        </p>
        <div className="flex items-end">
          <button
            onClick={handleCloseReminder}
            className="bg-backgroundButtonColor text-white px-4 py-2 rounded-[24px]"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {showReminder && reminderMessage}
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
    </div>
  );
};

export default Login;
