export interface SignUpProps {
  onSignUp: (userData: SignUpData) => void;
}

export interface SignUpData {
  email: string;
  password: string;
  error: string;
}