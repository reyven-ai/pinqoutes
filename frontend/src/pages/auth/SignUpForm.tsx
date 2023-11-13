import Visibility from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import InfoWarning from "@material-ui/icons/ErrorOutlineOutlined";
import Errors from "@material-ui/icons/CloseRounded";
import { UsersData } from "@/models/types";
import { useAuthForm } from "@/hooks/useUserRegistration";
import { cn } from "@/components/util/input.util";
import { Failed, icon } from "@/components/icons/iconStyles";

const AuthSignUpForm: React.FC<UsersData> = () => {
  const {
    showPassword,
    email,
    password,
    emailWarning,
    passwordWarning,
    emailInUseWarning,
    isSignUpSuccess,
    setShowPassword,
    handleEmailKeyDown,
    handlePasswordKeyDown,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
  } = useAuthForm();

  return (
    <form
      action=""
      onSubmit={handleSignUp}
      className="w-[470px] mt-8 ml-16 mr-16 max-[500px]:w-full"
    >
      {emailInUseWarning && (
        <p className="mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
          <Errors
            style={Failed}
            className="bg-backgroundErrorIcon p-[5px] mr-[10px] font-light rounded-[50%] bg-error text-white"
          />
          {emailInUseWarning}
        </p>
      )}
      <label
        htmlFor="email"
        className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
      >
        Your email address
        <span className="text-textError ml-[4px]">*</span>
      </label>
      <input
        className={cn(
          "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
          "placeholder-gray-500 text-[0.9rem] font-light",
          emailWarning || emailInUseWarning ? "border-2 border-rose-600" : ""
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
        className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
      >
        Your password<span className="text-textError ml-[4px]">*</span>
      </label>
      <div className="relative">
        <input
          id="passwordInput"
          className={cn(
            "border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
            "placeholder-gray-500 text-[0.9rem] font-light",
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
          onClick={() => setShowPassword(!showPassword)}
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
        className={`bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4 ${
          isSignUpSuccess ? "opacity-75" : ""
        }`}
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default AuthSignUpForm;
