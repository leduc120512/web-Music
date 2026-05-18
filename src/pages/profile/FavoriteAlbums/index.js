import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faPen,
  faPlus,
  faTrash,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";

import favoriteAlbumsApi from "../../../api/favoriteAlbums";
import styles from "../profile-module.scss";
import { buildSongPath } from "../../../utils/songRoute";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

const emptyForm = {
  name: "",
  description: "",
  isPublic: false,
};

const buildCover = (coverImage) => {
  if (!coverImage) return "https://via.placeholder.com/120";
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

function FavoriteAlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedSongs = useMemo(
    () => (Array.isArray(selectedAlbum?.songs) ? selectedAlbum.songs : []),
    [selectedAlbum]
  );

  const loadAlbums = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await favoriteAlbumsApi.getMine();
      setAlbums(data);
      if (!selectedId && data[0]?.id) {
        setSelectedId(data[0].id);
      }
    } catch (err) {
      setAlbums([]);
      setError(err?.response?.data?.message || "Khong tai duoc album yeu thich.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setSelectedAlbum(null);
      return;
    }

    const loadDetail = async () => {
      try {
        setDetailLoading(true);
        const detail = await favoriteAlbumsApi.getById(selectedId);
        setSelectedAlbum(detail);
      } catch (err) {
        setSelectedAlbum(null);
        setError(err?.response?.data?.message || "Khong tai duoc chi tiet album.");
      } finally {
        setDetailLoading(false);
      }
    };

    loadDetail();
  }, [selectedId]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Nhap ten album truoc khi luu.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");
      const payload = {
        name,
        description: form.description.trim(),
        isPublic: Boolean(form.isPublic),
      };

      const saved = editingId
        ? await favoriteAlbumsApi.update(editingId, payload)
        : await favoriteAlbumsApi.create(payload);

      resetForm();
      setMessage(editingId ? "Da cap nhat album." : "Da tao album moi.");
      await loadAlbums();

      if (saved?.id) {
        setSelectedId(saved.id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Khong luu duoc album.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (album) => {
    setEditingId(album.id);
    setForm({
      name: album.name || "",
      description: album.description || "",
      isPublic: Boolean(album.isPublic),
    });
  };

  const handleDeleteAlbum = async (albumId) => {
    if (!window.confirm("Xoa album yeu thich nay?")) return;

    try {
      setError("");
      await favoriteAlbumsApi.remove(albumId);
      setMessage("Da xoa album.");
      if (selectedId === albumId) {
        setSelectedId(null);
        setSelectedAlbum(null);
      }
      await loadAlbums();
    } catch (err) {
      setError(err?.response?.data?.message || "Khong xoa duoc album.");
    }
  };

  const handleRemoveSong = async (songId) => {
    if (!selectedId || !songId) return;

    try {
      setError("");
      await favoriteAlbumsApi.removeSong(selectedId, songId);
      const detail = await favoriteAlbumsApi.getById(selectedId);
      setSelectedAlbum(detail);
      await loadAlbums();
      setMessage("Da xoa bai hat khoi album.");
    } catch (err) {
      setError(err?.response?.data?.message || "Khong xoa duoc bai hat khoi album.");
    }
  };

  return (
    <section className={cx("profileSection", "favoriteAlbumPage")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Thu vien</p>
          <h2>Album yeu thich</h2>
        </div>
      </div>

      <div className={cx("favoriteAlbumLayout")}>
        <aside className={cx("favoriteAlbumPanel")}>
          <form className={cx("favoriteAlbumForm")} onSubmit={handleSubmit}>
            <p>{editingId ? "Sua album" : "Tao album"}</p>
            <input
              value={form.name}
              placeholder="Ten album"
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <textarea
              rows={3}
              value={form.description}
              placeholder="Mo ta"
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
            <label>
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(event) => setForm((prev) => ({ ...prev, isPublic: event.target.checked }))}
              />
              Cong khai
            </label>
            <div className={cx("favoriteAlbumFormActions")}>
              <button type="submit" className={cx("primaryAction")} disabled={saving}>
                <FontAwesomeIcon icon={faPlus} />
                {saving ? "Dang luu..." : "Luu"}
              </button>
              {editingId && (
                <button type="button" className={cx("secondaryAction")} onClick={resetForm}>
                  Huy
                </button>
              )}
            </div>
          </form>

          <div className={cx("favoriteAlbumList")}>
            {loading && <p className={cx("profileEmptyState")}>Dang tai album...</p>}
            {!loading && albums.length === 0 && (
              <p className={cx("profileEmptyState")}>Chua co album yeu thich.</p>
            )}

            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className={cx("favoriteAlbumListItem", { active: selectedId === album.id })}
                onClick={() => setSelectedId(album.id)}
              >
                <span>
                  <strong>{album.name}</strong>
                  <small>{album.songCount ?? 0} bai hat</small>
                </span>
                <FontAwesomeIcon icon={album.isPublic ? faUnlock : faLock} />
              </button>
            ))}
          </div>
        </aside>

        <main className={cx("favoriteAlbumDetail")}>
          {detailLoading && <p className={cx("profileEmptyState")}>Dang tai chi tiet album...</p>}

          {!detailLoading && selectedAlbum && (
            <>
              <div className={cx("favoriteAlbumDetailHead")}>
                <div>
                  <p>{selectedAlbum.isPublic ? "Cong khai" : "Rieng tu"}</p>
                  <h3>{selectedAlbum.name}</h3>
                  <span>{selectedAlbum.description || "Chua co mo ta"}</span>
                </div>
                <div className={cx("favoriteAlbumActions")}>
                  <button type="button" onClick={() => handleEdit(selectedAlbum)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" onClick={() => handleDeleteAlbum(selectedAlbum.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className={cx("favoriteSongList")}>
                {selectedSongs.length === 0 && (
                  <p className={cx("profileEmptyState")}>Album nay chua co bai hat.</p>
                )}

                {selectedSongs.map((song) => (
                  <div key={song.id} className={cx("favoriteSongItem")}>
                    <Link to={buildSongPath(song)} className={cx("favoriteSongLink")}>
                      <img src={buildCover(song.coverImage)} alt={song.title} />
                      <span>
                        <strong>{song.title || "Bai hat"}</strong>
                        <small>{song.artistName || "Chua ro nghe si"}</small>
                      </span>
                    </Link>
                    <button type="button" onClick={() => handleRemoveSong(song.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {!detailLoading && !selectedAlbum && (
            <p className={cx("profileEmptyState", "profileEmptyStateLarge")}>Chon album de xem chi tiet.</p>
          )}
        </main>
      </div>

      {message && <p className={cx("successTextProfile")}>{message}</p>}
      {error && <p className={cx("errorTextProfile")}>{error}</p>}
    </section>
  );
}

export default FavoriteAlbumsPage;
