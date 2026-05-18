import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faMusic, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

import recommendationsApi from "../../../../../api/recommendations";
import defaultAvatar from "../../header/G81A8377.JPG";
import styles from "../Sider-bar-module.scss";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

const buildAvatar = (avatar) => {
  if (!avatar) return defaultAvatar;
  if (/^https?:\/\//i.test(avatar)) return avatar;
  return `${ASSET_BASE}${String(avatar).startsWith("/") ? "" : "/"}${avatar}`;
};

const readUserId = (user) => user?.id ?? user?.userId ?? user?.authorId ?? user?.artistId ?? "";

const normalizeUser = (item = {}) => ({
  id: readUserId(item),
  avatar: buildAvatar(item.avatar || item.avatarUrl || item.profileImage),
  fullName: item.fullName || item.displayName || item.name || "Nguoi dung",
  username: item.username || item.email || "chua-cap-nhat",
  followerCount: Number(item.followerCount || item.followers || 0),
  totalSongs: Number(item.totalSongs || item.songCount || 0),
  totalPlays: Number(item.totalPlays || item.playCount || 0),
  reason: item.reason || item.aiReason || "",
  following: Boolean(item.following),
});

function RecommendedUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const data = await recommendationsApi.getUsers(10);
        if (!cancelled) {
          setUsers(Array.isArray(data) ? data.map(normalizeUser) : []);
        }
      } catch (error) {
        if (!cancelled) {
          setUsers([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleUsers = useMemo(() => users.slice(0, 10), [users]);

  if (!loading && visibleUsers.length === 0) return null;

  const handleFollowClick = (event, userId) => {
    event.preventDefault();
    event.stopPropagation();
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, following: true } : user)));
  };

  return (
    <section className={cx("recommendedUsers")}>
      <div className={cx("recommendedUsersHead")}>
        <FontAwesomeIcon icon={faUsers} />
        <span>De xuat tac gia</span>
      </div>

      {loading && <p className={cx("recommendedUsersState")}>Dang tai de xuat...</p>}

      {!loading && (
        <div className={cx("recommendedUsersList")}>
          {visibleUsers.map((user) => {
            const profilePath = user.id ? `/ProfileAuthor/${user.id}` : "/Profile";

            return (
              <Link key={`${user.id}-${user.username}`} to={profilePath} className={cx("recommendedUserItem")}>
                <img src={user.avatar} alt={user.fullName} />

                <div className={cx("recommendedUserBody")}>
                  <div className={cx("recommendedUserTop")}>
                    <div>
                      <p className={cx("recommendedUserName")}>{user.fullName}</p>
                      <p className={cx("recommendedUsername")}>@{user.username}</p>
                    </div>

                    {!user.following && (
                      <button type="button" onClick={(event) => handleFollowClick(event, user.id)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Theo doi</span>
                      </button>
                    )}
                  </div>

                  <div className={cx("recommendedUserStats")}>
                    <span>
                      <FontAwesomeIcon icon={faUsers} /> {user.followerCount}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faMusic} /> {user.totalSongs}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faHeadphones} /> {user.totalPlays}
                    </span>
                  </div>

                  {user.reason && <p className={cx("recommendedReason")}>{user.reason}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecommendedUsers;
