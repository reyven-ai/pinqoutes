export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id"); // Corrected key name
};

export const getCurrentToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

export const getCurrentUserId = () => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    return null;
  }

  return userId;
};

export function checkAuthLoader() {
  const token = getCurrentToken();
  const userId = getCurrentUserId();

  return { token, userId };
}
