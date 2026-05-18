import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";

import favoriteAlbumsApi from "../../api/favoriteAlbums";
import styles from "./favorite-album-modal.scss";

const cx = classnames.bind(styles);

const defaultForm = {
  name: "",
  description: "",
  isPublic: false,
};

function FavoriteAlbumModal({ open, song, onClose }) {
  const [albums, setAlbums] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [savingAlbumId, setSavingAlbumId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const hasToken = Boolean(Cookies.get("token"));

  useEffect(() => {
    if (!open) return;

    const loadAlbums = async () => {
      if (!hasToken) {
        setAlbums([]);
        setError("Vui long dang nhap de su dung album yeu thich.");
        return;
      }

      try {
        setLoading(true);
        setError("");
        setMessage("");
        const data = await favoriteAlbumsApi.getMine();
        setAlbums(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Khong tai duoc danh sach album.");
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, [open, hasToken]);

  useEffect(() => {
    if (!open) {
      setForm(defaultForm);
      setMessage("");
      setError("");
      setSavingAlbumId(null);
      setCreating(false);
    }
  }, [open]);

  if (!open) return null;

  const handleAddSong = async (albumId) => {
    if (!song?.id || !albumId) return;

    try {
      setSavingAlbumId(albumId);
      setError("");
      await favoriteAlbumsApi.addSong(albumId, song.id);
      setMessage(`Da them "${song.title || "bai hat"}" vao album.`);
    } catch (err) {
      setError(err?.response?.data?.message || "Khong them duoc bai hat vao album.");
    } finally {
      setSavingAlbumId(null);
    }
  };

  const handleCreateAlbum = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Nhap ten album truoc khi tao.");
      return;
    }

    try {
      setCreating(true);
      setError("");
      const created = await favoriteAlbumsApi.create({
        name,
        description: form.description.trim(),
        isPublic: Boolean(form.isPublic),
      });

      const nextAlbums = created ? [created, ...albums] : await favoriteAlbumsApi.getMine();
      setAlbums(nextAlbums);
      setForm(defaultForm);
      setMessage("Da tao album moi.");

      if (created?.id && song?.id) {
        await handleAddSong(created.id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Khong tao duoc album.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className={cx("favoriteModalBackdrop")} role="dialog" aria-modal="true">
      <div className={cx("favoriteModal")}>
        <div className={cx("favoriteModalHeader")}>
          <div>
            <p>Album yeu thich</p>
            <h3>{song?.title || "Chon bai hat"}</h3>
          </div>
          <button type="button" className={cx("iconButton")} onClick={onClose} aria-label="Dong">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {loading && (
          <p className={cx("stateText")}>
            <FontAwesomeIcon icon={faSpinner} spin /> Dang tai album...
          </p>
        )}

        {!loading && albums.length > 0 && (
          <div className={cx("albumList")}>
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className={cx("albumOption")}
                onClick={() => handleAddSong(album.id)}
                disabled={savingAlbumId === album.id}
              >
                <span>
                  <strong>{album.name}</strong>
                  <small>{album.songCount ?? 0} bai hat</small>
                </span>
                <span>{savingAlbumId === album.id ? "Dang them..." : "Them"}</span>
              </button>
            ))}
          </div>
        )}

        {!loading && albums.length === 0 && hasToken && (
          <p className={cx("stateText")}>Ban chua co album yeu thich nao.</p>
        )}

        <form className={cx("createAlbumForm")} onSubmit={handleCreateAlbum}>
          <p>Tao album moi</p>
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
          <label className={cx("checkboxLine")}>
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublic: event.target.checked }))}
            />
            Cong khai album
          </label>
          <button type="submit" className={cx("createButton")} disabled={creating || !hasToken}>
            <FontAwesomeIcon icon={faPlus} />
            {creating ? "Dang tao..." : "Tao va them bai hat"}
          </button>
        </form>

        {message && <p className={cx("successText")}>{message}</p>}
        {error && <p className={cx("errorText")}>{error}</p>}
      </div>
    </div>
  );
}

export default FavoriteAlbumModal;
