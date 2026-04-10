const slugify = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const buildSongPath = (song) => {
  const id = song?.id;
  if (id === null || id === undefined) return "/";

  const safeTitle = slugify(song?.title || song?.name || "bai-hat");
  return `/nhac/${safeTitle}-${id}`;
};

export const buildSongPathFromId = (id, title = "bai-hat") => {
  if (id === null || id === undefined || id === "") return "/";
  return `/nhac/${slugify(title)}-${id}`;
};

export const extractSongIdFromSlug = (value = "") => {
  const raw = String(value).trim();
  const match = raw.match(/(\d+)(?!.*\d)/);
  return match ? match[1] : raw;
};

export const isCanonicalSongSlug = (value = "", title = "") => {
  const id = extractSongIdFromSlug(value);
  if (!id) return false;
  const canonical = buildSongPathFromId(id, title).replace("/nhac/", "");
  return String(value).trim().toLowerCase() === canonical.toLowerCase();
};

