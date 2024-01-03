export const logout = () => {
  const removedToken = localStorage.removeItem("token");
  return removedToken;
};

export const getCurrentToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

export function checkAuthLoader() {
  const token = getCurrentToken();
  return token;
}
