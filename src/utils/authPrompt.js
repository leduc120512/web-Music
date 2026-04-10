const REQUIRE_LOGIN_EVENT = "require-login";

export const requestLoginModal = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(REQUIRE_LOGIN_EVENT));
};

export const subscribeRequireLogin = (handler) => {
  if (typeof window === "undefined" || typeof handler !== "function") {
    return () => {};
  }

  window.addEventListener(REQUIRE_LOGIN_EVENT, handler);
  return () => window.removeEventListener(REQUIRE_LOGIN_EVENT, handler);
};

