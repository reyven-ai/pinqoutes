import { getCurrentToken } from "./auth.services";

export default function authHeader() {
  const token = getCurrentToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return { Authorization: null };
  }
}
