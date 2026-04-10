const LIKE_UPDATED_EVENT = "song-like-updated";

export const emitSongLikeUpdated = (payload) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LIKE_UPDATED_EVENT, { detail: payload }));
};

export const subscribeSongLikeUpdated = (handler) => {
  if (typeof window === "undefined" || typeof handler !== "function") {
    return () => {};
  }

  const wrapped = (event) => {
    handler(event?.detail || null);
  };

  window.addEventListener(LIKE_UPDATED_EVENT, wrapped);
  return () => window.removeEventListener(LIKE_UPDATED_EVENT, wrapped);
};
