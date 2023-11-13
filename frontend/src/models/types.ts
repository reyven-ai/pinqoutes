export interface UsersData {
  onSignUp: (userData: UsersData) => void;
}

export interface UsersData {
  email: string;
  password: string;
  error: string;
}

// export interface AuthFormProps {
//   showPassword: boolean;
//   email: string;
//   password: string;
//   emailWarning: string;
//   passwordWarning: string;
//   emailInUseWarning: string;
//   invalid: string;
//   isSignUpSuccess: boolean;
//   setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
//   handleEmailKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
//   handlePasswordKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
//   handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   handleSignUp: () => Promise<void>;
//   handleLogin: () => Promise<void>;
// }
