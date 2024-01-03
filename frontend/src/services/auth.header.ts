import { getCurrentToken } from "./auth.util";

export default function authHeader() {
  const token = getCurrentToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return { Authorization: null };
  }
}
