import Cookies from "js-cookie";

const AUTH_KEYS = ["token", "user", "role", "accessToken", "refreshToken"];

export const clearAuthSession = () => {
  AUTH_KEYS.forEach((key) => {
    Cookies.remove(key);
    Cookies.remove(key, { path: "/" });

    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (error) {
      // Storage can be unavailable in restricted browser contexts.
    }
  });

  window.dispatchEvent(new Event("profile-updated"));
};

export const logoutNow = (target = "/") => {
  clearAuthSession();
  window.location.replace(target);
};
