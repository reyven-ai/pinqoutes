import { getCurrentToken } from "./auth.util";

export default function authHeader() {
  const token = getCurrentToken();
  const userId = localStorage.getItem("user_id");

  const headers = {
    Authorization: token ? `Bearer ${token}` : null,
    "X-User-Id": userId || null,
  };

  return headers;
}
