import Visibility from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import InfoWarning from "@material-ui/icons/ErrorOutlineOutlined";
import Errors from "@material-ui/icons/CloseRounded";
import { UsersData } from "@/models/types";
import { useAuthForm } from "@/hooks/useUserRegistration";
import { cn } from "@/components/util/input.util";
import { Failed, icon } from "@/components/icons/iconStyles";

const AuthLogInForm: React.FC<UsersData> = () => {
  const {
    showPassword,
    email,
    password,
    emailWarning,
    passwordWarning,
    invalid,
    setShowPassword,
    handleEmailKeyDown,
    handlePasswordKeyDown,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useAuthForm();

  return (
    <form action="" method="post" className="w-[470px] mt-8 ml-16 mr-16">
      {invalid && (
        <p className="text-text mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
          <Errors
            style={Failed}
            className="bg-backgroundErrorIcon text-[32px] mr-[10px] p-[0.3rem] font-light rounded-[50%] bg-error text-white"
          />
          {invalid}
        </p>
      )}
      <label
        htmlFor="email"
        className="text-text block mb-[3px] text-[15px] font-light"
      >
        Your email address
      </label>
      <input
        className={cn(
          "border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
          emailWarning ? "border-2 border-rose-600" : ""
        )}
        type="email"
        value={email}
        onChange={handleEmailChange}
        onKeyDown={handleEmailKeyDown}
      />
      {emailWarning && (
        <p className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center">
          <InfoWarning
            style={icon}
            className="items-center mr-[7px] mb-[2px]"
          />
          {emailWarning}
        </p>
      )}
      <label
        htmlFor="password"
        className="text-text block mb-[3px] text-[15px] font-light"
      >
        Your password
      </label>
      <div className="relative">
        <input
          id="passwordInput"
          className={cn(
            "border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
            passwordWarning ? "border-2 border-rose-600" : ""
          )}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handlePasswordKeyDown}
        />
        {passwordWarning && (
          <p className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center">
            <InfoWarning
              style={icon}
              className="items-center mr-[7px] mb-[2px]"
            />
            {passwordWarning}
          </p>
        )}
        <button
          className={cn(
            "transform -translate-y-1/2 bg-transparent border-none text-header absolute cursor-pointer font-light left-[93%] z-1 top-[50%]",
            passwordWarning ? "top-[30%]" : ""
          )}
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
        >
          {showPassword ? (
            <VisibilityOff style={icon} />
          ) : (
            <Visibility style={icon} />
          )}
        </button>
      </div>
      <button
        id="nextButton"
        className="bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4"
        type="button"
        onClick={handleLogin}
      >
        Log in
      </button>
    </form>
  );
};

export default AuthLogInForm;
