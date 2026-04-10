import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Switch from '@mui/material/Switch'
import axios from 'axios'
import Cookies from 'js-cookie'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretRight,
  faCopy,
  faExclamation,
  faHeadphones,
  faHeart,
  faMusic,
  faPlay,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons'

import styles from '../Play_music-module.scss'
import Text from '../../text'
import ListItemMusic from '../../results_search/results/List_item_musci1'
import songApi from '../../../api/api_music'
import likesApi from '../../../api/likes'
import commentsApi from '../../../api/comments'
import moderationApi from '../../../api/moderation'
import imglist from './1438828376816.jpg'
import { buildSongPath } from '../../../utils/songRoute'

const cx = classNames.bind(styles)
const ASSET_BASE = 'http://localhost:8082'
const COMMENT_PAGE_SIZE = 5
const REPLY_PREVIEW_SIZE = 2

const toNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatNumber = (value) => toNumber(value).toLocaleString('vi-VN')

const readArtistId = (song) => song?.artistId ?? song?.idartist ?? song?.artist?.id ?? null
const buildArtistProfilePath = (song) => {
  const artistId = readArtistId(song)
  return artistId ? `/ProfileAuthor/${artistId}` : ''
}

const joinUrl = (base, path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedPath = String(path).startsWith('/') ? String(path) : `/${String(path)}`

  return `${normalizedBase}${normalizedPath}`
}

function Music({ songId }) {
  const audioRef = useRef(null)
  const violationFormRef = useRef(null)
  const [songData, setSongData] = useState(null)
  const [songLoading, setSongLoading] = useState(false)
  const [songError, setSongError] = useState('')
  const [songs, setSongs] = useState([])
  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(false)
  const [isLyricExpanded, setIsLyricExpanded] = useState(false)
  const [commentsPage, setCommentsPage] = useState({
    items: [],
    page: 0,
    size: COMMENT_PAGE_SIZE,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
  })
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentError, setCommentError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [replyDrafts, setReplyDrafts] = useState({})
  const [editDrafts, setEditDrafts] = useState({})
  const [activeReplyId, setActiveReplyId] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [submittingAction, setSubmittingAction] = useState(false)
  const [isViolationFormVisible, setIsViolationFormVisible] = useState(false)
  const [songViolation, setSongViolation] = useState({ type: 'COPYRIGHT', description: '', evidenceUrl: '' })
  const [userActionMessage, setUserActionMessage] = useState('')
  const [userActionError, setUserActionError] = useState('')
  const [isEditingLyrics, setIsEditingLyrics] = useState(false)
  const [lyricsDraft, setLyricsDraft] = useState('')
  const [lyricsSaving, setLyricsSaving] = useState(false)
  const [lyricsMessage, setLyricsMessage] = useState('')
  const [lyricsError, setLyricsError] = useState('')
  const [artistSongs, setArtistSongs] = useState([])
  const [artistSongsLoading, setArtistSongsLoading] = useState(false)
  const [artistSongsError, setArtistSongsError] = useState('')

  const role = Cookies.get('role') || ''
  const canEditLyrics = role === 'ROLE_ADMIN' || role === 'ROLE_AUTHOR'

  const loadComments = useCallback(async (page = 0, append = false) => {
    if (!songId) return

    try {
      setCommentLoading(true)
      setCommentError('')
      const pageData = await commentsApi.getSongCommentsPage(songId, page, COMMENT_PAGE_SIZE, REPLY_PREVIEW_SIZE)
      setCommentsPage((prev) => ({
        ...pageData,
        items: append ? [...prev.items, ...pageData.items] : pageData.items,
      }))
    } catch (error) {
      setCommentError('Khong tai duoc binh luan.')
    } finally {
      setCommentLoading(false)
    }
  }, [songId])

  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        const res = await songApi.getLatestSongs()
        setSongs(res?.data?.data?.content || [])
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài hát mới:', error)
      }
    }

    fetchLatestSongs()
  }, [])

  useEffect(() => {
    loadComments(0, false)
  }, [loadComments])

  useEffect(() => {
    if (!songId) return

    const fetchSongDetail = async () => {
      try {
        setSongLoading(true)
        setSongError('')

        let detail

        try {
          const publicRes = await songApi.getByIdPublicCached(songId)
          detail = publicRes?.data?.data || null
        } catch (publicError) {
          const token = Cookies.get('token')
          const privateRes = await axios.get(`${ASSET_BASE}/api/songs/${songId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
          detail = privateRes?.data?.data || null
        }

        setSongData(detail)
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài hát:', error)
        setSongError('Không tải được thông tin bài hát')
        setSongData(null)
      } finally {
        setSongLoading(false)
      }
    }

    fetchSongDetail()
  }, [songId])

  useEffect(() => {
    document.title = songData?.title ? `${songData.title} | Web Nhac` : 'Nghe nhac | Web Nhac'
  }, [songData?.title])

  useEffect(() => {
    setLyricsDraft(songData?.lyrics || '')
  }, [songData?.lyrics])

  const audioSrc = useMemo(() => {
    return songData?.filePath ? joinUrl(ASSET_BASE, songData.filePath) : ''
  }, [songData])

  const artistId = useMemo(() => readArtistId(songData), [songData])

  const coverImage = useMemo(() => {
    return songData?.coverImage ? joinUrl(ASSET_BASE, songData.coverImage) : imglist
  }, [songData])

  const visibleSongs = useMemo(() => {
    return isPlaylistExpanded ? songs : songs.slice(0, 4)
  }, [isPlaylistExpanded, songs])

  const currentSongId = useMemo(() => String(songData?.id ?? songId ?? ''), [songData?.id, songId])

  const artistSongsList = useMemo(() => {
    const seenIds = new Set()
    const merged = []

    if (songData?.id) {
      seenIds.add(songData.id)
      merged.push(songData)
    }

    artistSongs.forEach((song) => {
      if (!song?.id || seenIds.has(song.id)) return
      seenIds.add(song.id)
      merged.push(song)
    })

    return merged
  }, [artistSongs, songData])

  const artistStats = useMemo(
    () =>
      artistSongsList.reduce(
        (acc, song) => ({
          songCount: acc.songCount + 1,
          playCount: acc.playCount + toNumber(song?.playCount),
          likeCount: acc.likeCount + toNumber(song?.likeCount),
        }),
        { songCount: 0, playCount: 0, likeCount: 0 },
      ),
    [artistSongsList],
  )

  useEffect(() => {
    if (!artistId) {
      setArtistSongs([])
      setArtistSongsError('')
      setArtistSongsLoading(false)
      return
    }

    let cancelled = false

    const loadArtistSongs = async () => {
      try {
        setArtistSongsLoading(true)
        setArtistSongsError('')
        const data = await songApi.getSongsByArtistPublic(artistId)
        if (!cancelled) {
          setArtistSongs(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        if (!cancelled) {
          setArtistSongs([])
          setArtistSongsError('Khong tai duoc danh sach bai hat cua nghe si.')
        }
      } finally {
        if (!cancelled) {
          setArtistSongsLoading(false)
        }
      }
    }

    loadArtistSongs()

    return () => {
      cancelled = true
    }
  }, [artistId])

  const handleLoadMoreComments = () => {
    if (!commentsPage.hasNext || commentLoading) return
    loadComments(commentsPage.page + 1, true)
  }

  const handleSubmitComment = async () => {
    if (!songId || !newComment.trim()) return

    try {
      setSubmittingAction(true)
      await commentsApi.createSongComment(songId, { content: newComment.trim() })
      setNewComment('')
      loadComments(0, false)
    } catch (error) {
      setCommentError('Khong gui duoc binh luan. Vui long dang nhap lai.')
    } finally {
      setSubmittingAction(false)
    }
  }

  const handleSubmitReply = async (commentId) => {
    const replyContent = replyDrafts[commentId]?.trim()
    if (!replyContent) return

    try {
      setSubmittingAction(true)
      await commentsApi.replyComment(commentId, { content: replyContent })
      setReplyDrafts((prev) => ({ ...prev, [commentId]: '' }))
      setActiveReplyId(null)
      loadComments(0, false)
    } catch (error) {
      setCommentError('Khong gui duoc phan hoi.')
    } finally {
      setSubmittingAction(false)
    }
  }

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id)
    setEditDrafts((prev) => ({ ...prev, [comment.id]: comment.content || '' }))
  }

  const handleSaveEdit = async (commentId) => {
    const content = editDrafts[commentId]?.trim()
    if (!content) return

    try {
      setSubmittingAction(true)
      await commentsApi.updateComment(commentId, { content })
      setEditingCommentId(null)
      loadComments(0, false)
    } catch (error) {
      setCommentError('Khong sua duoc binh luan.')
    } finally {
      setSubmittingAction(false)
    }
  }

  const handleReportComment = async (commentId) => {
    const detail = window.prompt('Nhap noi dung report comment', 'Comment nay dang spam')
    if (!detail) return

    try {
      setSubmittingAction(true)
      await commentsApi.reportComment(commentId, { reason: 'SPAM', detail })
      setUserActionError('')
      setUserActionMessage('Da gui bao cao comment.')
    } catch (error) {
      setUserActionMessage('')
      setUserActionError('Khong gui duoc bao cao comment.')
    } finally {
      setSubmittingAction(false)
    }
  }

  const handleSubmitSongViolation = async () => {
    if (!songId || !songViolation.description.trim()) return

    try {
      setSubmittingAction(true)
      await moderationApi.reportSongViolation(songId, {
        type: songViolation.type,
        description: songViolation.description.trim(),
        evidenceUrl: songViolation.evidenceUrl.trim(),
      })
      setSongViolation({ type: 'COPYRIGHT', description: '', evidenceUrl: '' })
      setIsViolationFormVisible(false)
      setUserActionError('')
      setUserActionMessage('Da gui bao cao vi pham bai hat.')
    } catch (error) {
      setUserActionMessage('')
      setUserActionError('Gui bao cao bai hat that bai.')
    } finally {
      setSubmittingAction(false)
    }
  }

  const handleToggleLike = async (targetSong) => {
    if (!targetSong?.id) return

    const token = Cookies.get('token')
    if (!token) {
      alert('Vui long dang nhap de tym bai hat.')
      return
    }

    const currentLiked = !!targetSong.liked
    const originalLikeCount = targetSong.likeCount || 0
    const optimisticLikeCount = Math.max(0, originalLikeCount + (currentLiked ? -1 : 1))

    setSongData((prev) => {
      if (!prev || prev.id !== targetSong.id) return prev
      return { ...prev, liked: !currentLiked, likeCount: optimisticLikeCount }
    })

    setSongs((prev) =>
      prev.map((song) =>
        song.id === targetSong.id ? { ...song, liked: !currentLiked, likeCount: optimisticLikeCount } : song,
      ),
    )

    try {
      if (currentLiked) {
        await likesApi.unlikeSong(targetSong.id)
      } else {
        await likesApi.likeSong(targetSong.id)
      }

      const countRes = await likesApi.getSongLikeCount(targetSong.id)
      const countData = countRes?.data?.data
      const latestCount = Number(
        typeof countData === 'object' && countData !== null ? countData.likeCount : countData,
      )
      if (!Number.isNaN(latestCount)) {
        setSongData((prev) => (prev?.id === targetSong.id ? { ...prev, likeCount: latestCount } : prev))
        setSongs((prev) => prev.map((song) => (song.id === targetSong.id ? { ...song, likeCount: latestCount } : song)))
      }
    } catch (error) {
      setSongData((prev) => {
        if (!prev || prev.id !== targetSong.id) return prev
        return { ...prev, liked: currentLiked, likeCount: originalLikeCount }
      })
      setSongs((prev) =>
        prev.map((song) =>
          song.id === targetSong.id ? { ...song, liked: currentLiked, likeCount: originalLikeCount } : song,
        ),
      )
    }
  }

  const handleOpenSongViolation = () => {
    setIsViolationFormVisible(true)
    requestAnimationFrame(() => {
      violationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleSaveLyrics = async () => {
    if (!songData?.id || !canEditLyrics) return

    try {
      setLyricsSaving(true)
      setLyricsError('')
      setLyricsMessage('')

      const response = await songApi.updateLyrics(songData.id, lyricsDraft)
      const updatedSong = response?.data?.data || null

      if (updatedSong) {
        setSongData((prev) => ({ ...(prev || {}), ...updatedSong }))
        setLyricsDraft(updatedSong.lyrics || lyricsDraft)
      }

      setIsEditingLyrics(false)
      setLyricsMessage('Đã cập nhật lời bài hát.')
    } catch (error) {
      setLyricsError(error?.response?.data?.message || 'Không thể cập nhật lyrics. Vui lòng thử lại.')
    } finally {
      setLyricsSaving(false)
    }
  }

  useEffect(() => {
    if (!audioSrc || !audioRef.current) return

    audioRef.current.currentTime = 0
    const playPromise = audioRef.current.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Trinh duyet co the chan autoplay neu khong co user gesture hop le.
      })
    }
  }, [audioSrc, songId])

  return (
      <div className={cx('music-page')}>
        <div className={cx('music-container')}>
          <div className={cx('music-layout')}>
            <section className={cx('music-main')}>
              <div className={cx('music-card')}>
                <Breadcrumb songData={songData} />

                <div className={cx('musicTopGrid')}>
                  <HeroSection
                    songData={songData}
                    songLoading={songLoading}
                    coverImage={coverImage}
                    onToggleLike={handleToggleLike}
                    onOpenViolationForm={handleOpenSongViolation}
                  />

                  <ArtistQuickCard
                    songData={songData}
                    coverImage={coverImage}
                    artistSongs={artistSongsList}
                    artistStats={artistStats}
                    artistSongsLoading={artistSongsLoading}
                    artistSongsError={artistSongsError}
                  />
                </div>

                <SongInfo
                    songData={songData}
                    audioSrc={audioSrc}
                    songError={songError}
                    audioRef={audioRef}
                    onToggleLike={handleToggleLike}
                />

                <UserActionsSection
                  reportRef={violationFormRef}
                  songViolation={songViolation}
                  onSongViolationChange={setSongViolation}
                  onSubmitSongViolation={handleSubmitSongViolation}
                  isViolationFormVisible={isViolationFormVisible}
                  onOpenViolationForm={handleOpenSongViolation}
                  userActionMessage={userActionMessage}
                  userActionError={userActionError}
                  submittingAction={submittingAction}
                />

                <LyricsSection
                    songData={songData}
                    expanded={isLyricExpanded}
                    onToggle={() => setIsLyricExpanded((prev) => !prev)}
                    canEditLyrics={canEditLyrics}
                    isEditingLyrics={isEditingLyrics}
                    onStartEditLyrics={() => {
                      setLyricsMessage('')
                      setLyricsError('')
                      setIsEditingLyrics(true)
                    }}
                    onCancelEditLyrics={() => {
                      setIsEditingLyrics(false)
                      setLyricsDraft(songData?.lyrics || '')
                    }}
                    lyricsDraft={lyricsDraft}
                    onChangeLyricsDraft={setLyricsDraft}
                    onSaveLyrics={handleSaveLyrics}
                    lyricsSaving={lyricsSaving}
                    lyricsMessage={lyricsMessage}
                    lyricsError={lyricsError}
                />

                <RelatedBlock songData={songData} />

                <CommentsSection
                  commentsPage={commentsPage}
                  loading={commentLoading}
                  error={commentError}
                  newComment={newComment}
                  onChangeNewComment={setNewComment}
                  onSubmitComment={handleSubmitComment}
                  onLoadMore={handleLoadMoreComments}
                  replyDrafts={replyDrafts}
                  onChangeReplyDraft={setReplyDrafts}
                  activeReplyId={activeReplyId}
                  onToggleReply={setActiveReplyId}
                  onSubmitReply={handleSubmitReply}
                  editingCommentId={editingCommentId}
                  onStartEdit={handleStartEdit}
                  editDrafts={editDrafts}
                  onChangeEditDraft={setEditDrafts}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditingCommentId(null)}
                  onReportComment={handleReportComment}
                  submittingAction={submittingAction}
                />

                <ListItemMusic />
              </div>
            </section>

            <section className={cx('music-sidebar-wrap')}>
              <aside className={cx('music-sidebar')}>
                <SidebarHeader />

                <div className={cx('music-sidebar-list')}>
                  {visibleSongs.map((song) => (
                      <SongItem
                        key={song.id}
                        song={song}
                        onToggleLike={handleToggleLike}
                        currentSongId={currentSongId}
                      />
                  ))}

                  {songs.length > 4 && (
                      <button
                          type='button'
                          className={cx('sidebar-toggle')}
                          onClick={() => setIsPlaylistExpanded((prev) => !prev)}
                      >
                        {isPlaylistExpanded ? 'Rút gọn' : 'Xem thêm'}
                      </button>
                  )}
                </div>
              </aside>
            </section>
          </div>
        </div>
      </div>
  )
}

function HeroSection({ songData, songLoading, coverImage, onToggleLike, onOpenViolationForm }) {
  const title = songLoading ? 'Đang tải...' : songData?.title || 'Không có tiêu đề'
  const artistProfilePath = buildArtistProfilePath(songData)

  return (
    <section className={cx('music-hero')}>
      <div className={cx('hero-cover-wrap')}>
        <img className={cx('hero-cover')} src={coverImage} alt={title} />
      </div>

      <div className={cx('hero-content')}>
        <p className={cx('hero-kicker')}>Đang phát</p>
        <h1 className={cx('music-title')}>{title}</h1>

        <p className={cx('hero-artist')}>
          {artistProfilePath ? (
            <Link to={artistProfilePath}>{songData?.artistName || 'Chưa rõ nghệ sĩ'}</Link>
          ) : (
            songData?.artistName || 'Chưa rõ nghệ sĩ'
          )}
        </p>

        <div className={cx('hero-metrics')}>
          <span>
            <FontAwesomeIcon icon={faHeadphones} /> {songData?.playCount ?? 0} lượt nghe
          </span>
          <span>
            <FontAwesomeIcon icon={faHeart} /> {songData?.likeCount ?? 0} yêu thích
          </span>
          <span>{songData?.genreName || 'Đang cập nhật thể loại'}</span>
        </div>

        <div className={cx('hero-actions')}>
          <button type='button' className={cx('hero-btn', 'primary')}>
            <FontAwesomeIcon icon={faPlay} /> Nghe ngay
          </button>
          <button type='button' className={cx('hero-btn')} onClick={() => onToggleLike(songData)}>
            <FontAwesomeIcon icon={faHeart} /> {songData?.liked ? 'Đã thích' : 'Yêu thích'}
          </button>
          <button type='button' className={cx('hero-btn')} onClick={onOpenViolationForm}>
            <FontAwesomeIcon icon={faExclamation} /> Báo cáo
          </button>
        </div>
      </div>
    </section>
  )
}

function ArtistQuickCard({ songData, coverImage, artistSongs, artistStats, artistSongsLoading, artistSongsError }) {
  const artistProfilePath = buildArtistProfilePath(songData)
  const artistName = songData?.artistName || 'Chưa rõ nghệ sĩ'
  const followers = songData?.artistFollowerCount ?? 0
  const topSongs = artistSongs.slice(0, 5)

  return (
    <aside className={cx('artistQuickCard')}>
      <p className={cx('artistQuickTitle')}>Nghệ sĩ</p>

      <div className={cx('artistQuickBody')}>
        <img className={cx('artistAvatar')} src={coverImage} alt={artistName} />

        <div className={cx('artistMeta')}>
          <p className={cx('artistName')}>{artistName}</p>
          <p className={cx('artistFollowers')}>{followers} người theo dõi</p>
        </div>
      </div>

      <div className={cx('artistActions')}>
        {artistProfilePath ? (
          <Link to={artistProfilePath} className={cx('artistActionBtn')}>
            Xem hồ sơ
          </Link>
        ) : (
          <span className={cx('artistActionBtn', 'disabled')}>Chưa có hồ sơ</span>
        )}
      </div>

      <div className={cx('artistInfoRow')}>
        <span>Album</span>
        <strong>{songData?.albumTitle || 'Đang cập nhật'}</strong>
      </div>
      <div className={cx('artistInfoRow')}>
        <span>Thể loại</span>
        <strong>{songData?.genreName || 'Đang cập nhật'}</strong>
      </div>

      <div className={cx('artistStatsGrid')}>
        <div className={cx('artistStatItem')}>
          <span>Bài hát</span>
          <strong>{formatNumber(artistStats.songCount)}</strong>
        </div>
        <div className={cx('artistStatItem')}>
          <span>Lượt nghe</span>
          <strong>{formatNumber(artistStats.playCount)}</strong>
        </div>
        <div className={cx('artistStatItem')}>
          <span>Lượt thích</span>
          <strong>{formatNumber(artistStats.likeCount)}</strong>
        </div>
      </div>

      <div className={cx('artistSongListWrap')}>
        <p className={cx('artistSongListTitle')}>Bài hát của nghệ sĩ</p>

        {artistSongsLoading && <p className={cx('artistSongState')}>Đang tải danh sách bài hát...</p>}
        {!artistSongsLoading && artistSongsError && <p className={cx('artistSongState', 'error-text')}>{artistSongsError}</p>}

        {!artistSongsLoading && !artistSongsError && topSongs.length === 0 && (
          <p className={cx('artistSongState')}>Chưa có dữ liệu bài hát của nghệ sĩ này.</p>
        )}

        {!artistSongsLoading && !artistSongsError && topSongs.length > 0 && (
          <div className={cx('artistSongList')}>
            {topSongs.map((song) => (
              <Link
                key={song.id}
                to={buildSongPath(song)}
                className={cx('artistSongItem', { active: song.id === songData?.id })}
                onClick={(event) => {
                  if (String(song.id) === String(songData?.id)) {
                    event.preventDefault()
                  }
                }}
              >
                <span className={cx('artistSongName')}>{song.title || 'Bài hát chưa đặt tên'}</span>
                <span className={cx('artistSongMetrics')}>
                  <FontAwesomeIcon icon={faHeadphones} /> {formatNumber(song.playCount)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

function Breadcrumb({ songData }) {
  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Bài hát', to: '/Video' },
    { label: songData?.genreName || 'Đang cập nhật' },
    { label: songData?.title || 'Đang tải bài hát' },
  ]

  return (
      <div className={cx('breadcrumb')}>
        {breadcrumbItems.map((item, index) => (
            <div key={`${index}-${item.label}`} className={cx('breadcrumb-item')}>
              {item.to ? <Link to={item.to}><span>{item.label}</span></Link> : <span>{item.label}</span>}
              {index < breadcrumbItems.length - 1 && (
                  <FontAwesomeIcon icon={faCaretRight} className={cx('breadcrumb-icon')} />
              )}
            </div>
        ))}
      </div>
  )
}

function SongInfo({ songData, audioSrc, songError, audioRef, onToggleLike }) {
  const artistProfilePath = buildArtistProfilePath(songData)

  return (
      <section className={cx('info-card')}>
        {audioSrc ? (
            <audio
                ref={audioRef}
                className={cx('audio-player')}
                src={audioSrc}
                controls
                preload='metadata'
                crossOrigin='anonymous'
            />
        ) : (
            <div className={cx('audio-empty')}>
              <FontAwesomeIcon icon={faMusic} />
              <span>Chưa có file audio cho bài hát này.</span>
            </div>
        )}

        <div className={cx('info-list')}>
          <p>
            <strong>Yêu thích:</strong>{' '}
            <button
              type='button'
              className={cx('like-button-inline', { liked: songData?.liked })}
              onClick={() => onToggleLike(songData)}
            >
              <FontAwesomeIcon icon={faHeart} /> <span>{songData?.likeCount ?? 0}</span>
            </button>
          </p>
          <p>
            <strong>Ca sĩ:</strong>{' '}
            {artistProfilePath ? (
              <Link to={artistProfilePath}>
                {songData?.artistName || 'Chưa rõ'}
              </Link>
            ) : (
              songData?.artistName || 'Chưa rõ'
            )}
          </p>
          <p>
            <strong>Album:</strong> {songData?.albumTitle || 'Chưa rõ'}
          </p>
          <p>
            <strong>Thể loại:</strong> {songData?.genreName || 'Chưa rõ'}
          </p>
          <p>
            <strong>Mô tả:</strong> {songData?.description || 'Không có mô tả'}
          </p>
          <p>
            <strong>Lượt nghe:</strong> {songData?.playCount ?? 0}
          </p>

          {songError && <p className={cx('error-text')}>{songError}</p>}
        </div>
      </section>
  )
}

function UserActionsSection({
  reportRef,
  songViolation,
  onSongViolationChange,
  onSubmitSongViolation,
  isViolationFormVisible,
  onOpenViolationForm,
  userActionMessage,
  userActionError,
  submittingAction,
}) {
  return (
    <section className={cx('info-card')}>
      <div className={cx('section-head')}>
        <h3>Tương tác người dùng</h3>
      </div>

      <div className={cx('community-grid')} ref={reportRef}>
        <div className={cx('community-card')}>
          <p className={cx('community-title')}>Báo cáo vi phạm bài hát</p>
          <p className={cx('comment-muted')}>Bấm "Báo cáo" ở phần trên để mở nhanh form ngay tại đây.</p>

          {!isViolationFormVisible && (
            <button type='button' className={cx('action-button')} onClick={onOpenViolationForm}>
              Mở form báo cáo
            </button>
          )}

          {isViolationFormVisible && (
            <div className={cx('inline-report-form')}>
              <select
                className={cx('field-input')}
                value={songViolation.type}
                onChange={(event) => onSongViolationChange((prev) => ({ ...prev, type: event.target.value }))}
              >
                <option value='COPYRIGHT'>COPYRIGHT</option>
                <option value='COMMUNITY'>COMMUNITY</option>
                <option value='OTHER'>OTHER</option>
              </select>

              <textarea
                className={cx('comment-input')}
                rows={4}
                placeholder='Mô tả vi phạm'
                value={songViolation.description}
                onChange={(event) => onSongViolationChange((prev) => ({ ...prev, description: event.target.value }))}
              />

              <input
                className={cx('field-input')}
                placeholder='Evidence URL (không bắt buộc)'
                value={songViolation.evidenceUrl}
                onChange={(event) => onSongViolationChange((prev) => ({ ...prev, evidenceUrl: event.target.value }))}
              />

              <div className={cx('report-actions')}>
                <button type='button' className={cx('action-button')} onClick={onSubmitSongViolation} disabled={submittingAction}>
                  {submittingAction ? 'Đang gửi...' : 'Gửi báo cáo'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {userActionMessage && <p className={cx('success-text')}>{userActionMessage}</p>}
      {userActionError && <p className={cx('error-text')}>{userActionError}</p>}
    </section>
  )
}

function CommentsSection({
  commentsPage,
  loading,
  error,
  newComment,
  onChangeNewComment,
  onSubmitComment,
  onLoadMore,
  replyDrafts,
  onChangeReplyDraft,
  activeReplyId,
  onToggleReply,
  onSubmitReply,
  editingCommentId,
  onStartEdit,
  editDrafts,
  onChangeEditDraft,
  onSaveEdit,
  onCancelEdit,
  onReportComment,
  submittingAction,
}) {
  return (
    <section className={cx('lyrics-card')}>
      <div className={cx('section-head')}>
        <h3>Bình luận ({commentsPage.totalItems})</h3>
      </div>

      <div className={cx('comment-editor')}>
        <textarea
          className={cx('comment-input')}
          rows={3}
          placeholder='Viết bình luận của bạn...'
          value={newComment}
          onChange={(event) => onChangeNewComment(event.target.value)}
        />
        <button type='button' className={cx('action-button')} onClick={onSubmitComment} disabled={submittingAction}>
          Đăng bình luận
        </button>
      </div>

      {error && <p className={cx('error-text')}>{error}</p>}
      {loading && <p className={cx('comment-muted')}>Đang tải bình luận...</p>}

      <div className={cx('comment-list')}>
        {commentsPage.items.map((comment) => {
          const commentReplies = Array.isArray(comment.replies) ? comment.replies : []
          const isEditing = editingCommentId === comment.id

          return (
            <article key={comment.id} className={cx('comment-item')}>
              <div className={cx('comment-head')}>
                <p className={cx('comment-user')}>{comment.username || 'Nguoi dung'}</p>
                <p className={cx('comment-time')}>{comment.createdAt || ''}</p>
              </div>

              {isEditing ? (
                <div className={cx('comment-editor-inline')}>
                  <textarea
                    className={cx('comment-input')}
                    rows={2}
                    value={editDrafts[comment.id] || ''}
                    onChange={(event) => onChangeEditDraft((prev) => ({ ...prev, [comment.id]: event.target.value }))}
                  />
                  <div className={cx('comment-actions')}>
                    <button type='button' className={cx('text-button')} onClick={() => onSaveEdit(comment.id)}>
                      Luu
                    </button>
                    <button type='button' className={cx('text-button')} onClick={onCancelEdit}>
                      Huy
                    </button>
                  </div>
                </div>
              ) : (
                <p className={cx('comment-content')}>{comment.deleted ? 'Binh luan da bi an' : comment.content}</p>
              )}

              <div className={cx('comment-actions')}>
                <button type='button' className={cx('text-button')} onClick={() => onToggleReply(activeReplyId === comment.id ? null : comment.id)}>
                  Trả lời
                </button>
                <button type='button' className={cx('text-button')} onClick={() => onStartEdit(comment)}>
                  Sửa
                </button>
                <button type='button' className={cx('text-button')} onClick={() => onReportComment(comment.id)}>
                  Report
                </button>
              </div>

              {activeReplyId === comment.id && (
                <div className={cx('comment-editor-inline')}>
                  <textarea
                    className={cx('comment-input')}
                    rows={2}
                    placeholder='Viết phản hồi...'
                    value={replyDrafts[comment.id] || ''}
                    onChange={(event) => onChangeReplyDraft((prev) => ({ ...prev, [comment.id]: event.target.value }))}
                  />
                  <button type='button' className={cx('action-button', 'small')} onClick={() => onSubmitReply(comment.id)}>
                    Gửi phản hồi
                  </button>
                </div>
              )}

              {commentReplies.length > 0 && (
                <div className={cx('reply-list')}>
                  {commentReplies.map((reply) => (
                    <div key={reply.id} className={cx('reply-item')}>
                      <p className={cx('comment-user')}>{reply.username || 'Nguoi dung'}</p>
                      <p className={cx('comment-content')}>{reply.deleted ? 'Phan hoi da bi an' : reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>

      {commentsPage.hasNext && (
        <button type='button' className={cx('sidebar-toggle')} onClick={onLoadMore} disabled={loading}>
          Xem thêm bình luận
        </button>
      )}
    </section>
  )
}

function LyricsSection({
  songData,
  expanded,
  onToggle,
  canEditLyrics,
  isEditingLyrics,
  onStartEditLyrics,
  onCancelEditLyrics,
  lyricsDraft,
  onChangeLyricsDraft,
  onSaveLyrics,
  lyricsSaving,
  lyricsMessage,
  lyricsError,
}) {
  const lyricsValue = songData?.lyrics || ''
  const artistProfilePath = buildArtistProfilePath(songData)

  return (
      <section className={cx('lyrics-card')}>
        <div className={cx('section-head')}>
          <h3>Lời bài hát</h3>
          <p className={cx('lyrics-author')}>
            {artistProfilePath ? (
              <Link to={artistProfilePath}>Lời đăng bởi: <span>{songData?.artistName || 'Chưa rõ'}</span></Link>
            ) : (
              <span>Lời đăng bởi: <span>{songData?.artistName || 'Chưa rõ'}</span></span>
            )}
          </p>

          {canEditLyrics && !isEditingLyrics && (
            <button type='button' className={cx('text-button', 'lyricsEditBtn')} onClick={onStartEditLyrics}>
              Chỉnh sửa lyrics
            </button>
          )}
        </div>

        {isEditingLyrics ? (
          <div className={cx('lyrics-editor')}>
            <textarea
              className={cx('comment-input', 'lyricsTextarea')}
              rows={8}
              value={lyricsDraft}
              onChange={(event) => onChangeLyricsDraft(event.target.value)}
              placeholder='Nhập lời bài hát nhiều dòng...'
            />
            <div className={cx('comment-actions')}>
              <button
                type='button'
                className={cx('action-button')}
                onClick={onSaveLyrics}
                disabled={lyricsSaving}
              >
                {lyricsSaving ? 'Đang lưu...' : 'Lưu lyrics'}
              </button>
              <button type='button' className={cx('text-button')} onClick={onCancelEditLyrics}>
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className={cx('lyrics-content', { expanded })}>
            {lyricsValue ? (
              <p className={cx('lyricsText')}>{lyricsValue}</p>
            ) : (
              <p className={cx('lyricsEmpty')}>Bài hát chưa có lyrics.</p>
            )}
          </div>
        )}

        {lyricsMessage && <p className={cx('success-text')}>{lyricsMessage}</p>}
        {lyricsError && <p className={cx('error-text')}>{lyricsError}</p>}

        <button type='button' className={cx('text-toggle')} onClick={onToggle}>
          <span>{expanded ? 'Thu gọn' : 'Xem thêm'}</span>
          <FontAwesomeIcon icon={expanded ? faSortUp : faSortDown} />
        </button>
      </section>
  )
}

function RelatedBlock({ songData }) {
  return (
      <section className={cx('related-card')}>
        <Text>{songData?.artistName ? `Nghe them tu ${songData.artistName}` : 'De xuat cho ban'}</Text>

        <div className={cx('related-list')}>
          <div className={cx('related-item')}>
            <Link to={songData?.id ? buildSongPath(songData) : '/'}>
              <img className={cx('related-thumb')} src={imglist} alt='list' />
              <FontAwesomeIcon className={cx('related-play')} icon={faPlay} />
              <p>{songData?.title || 'Bai hat de xuat'}</p>
            </Link>
          </div>
        </div>
      </section>
  )
}

function SidebarHeader() {
  const switchLabel = { inputProps: { 'aria-label': 'Autoplay' } }

  return (
      <div className={cx('sidebar-head')}>
        <Text className={cx('sidebar-title')}>NGHE TIẾP</Text>

        <div className={cx('sidebar-actions')}>
          <span>Autoplay</span>

          <div className={cx('info-badge')}>
            <FontAwesomeIcon icon={faExclamation} />
          </div>

          <Switch {...switchLabel} defaultChecked />
        </div>
      </div>
  )
}

function SongItem({ song, onToggleLike, currentSongId }) {
  const cover = song.coverImage
      ? joinUrl(ASSET_BASE, song.coverImage)
      : 'https://via.placeholder.com/100'
  const isCurrentSong = String(song?.id ?? '') === String(currentSongId ?? '')

  return (
      <Link
        to={buildSongPath(song)}
        className={cx('song-item', { active: isCurrentSong })}
        onClick={(event) => {
          if (isCurrentSong) {
            event.preventDefault()
          }
        }}
      >
        <div className={cx('song-main')}>
          <img className={cx('song-thumb')} src={cover} alt={song.title} />

          <div className={cx('song-meta')}>
            <p className={cx('song-name')}>{song.title}</p>
            <p className={cx('song-artist')}>{song.artistName}</p>
          </div>
        </div>

        <div className={cx('song-tags')}>
          <button type='button' className={cx('tag-button', 'tag-official')}>
            Official
          </button>
          <button type='button' className={cx('tag-button', 'tag-sq')}>
            SQ
          </button>
        </div>

        <div className={cx('song-actions')}>
          <div className={cx('song-plays')}>
            <FontAwesomeIcon icon={faHeadphones} />
            <span>{song.playCount ?? 0}</span>
          </div>

          <FontAwesomeIcon
              icon={faHeart}
              className={cx('song-action-icon', 'song-action-like', { liked: song.liked })}
              onClick={(event) => {
                event.preventDefault()
                onToggleLike(song)
              }}
          />

          <FontAwesomeIcon icon={faCopy} className={cx('song-action-icon')} />
        </div>
      </Link>
  )
}

export default Music