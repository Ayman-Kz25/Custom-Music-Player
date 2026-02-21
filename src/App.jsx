import {
  MicVocal,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import "material-symbols/outlined.css";
import "material-symbols/rounded.css";
import { useEffect, useRef, useState } from "react";
import songs from "./songs.json";

function App() {
  const [theme, setTheme] = useState("light");
  const [musicName, setMusicName] = useState("");
  const [musicArtist, setMusicArtist] = useState("");
  const [musicImg, setMusicImg] = useState(null);
  const [musicAudio, setMusicAudio] = useState(null);
  const [isMusicPause, setIsMusicPause] = useState(true);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicIndex, setMusicIndex] = useState(() =>
    Math.floor(Math.random() * songs.length),
  );
  const [repeatMode, setRepeatMode] = useState("repeat");
  const [showMusicList, setShowMusicList] = useState(false);
  const [durations, setDurations] = useState({});
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const listRefs = useRef([]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function toggleLyrics() {
    setShowLyrics((prev) => !prev);
  }

  function playMusic() {
    audioRef.current.play();
    setIsMusicPause(false);
  }

  function pauseMusic() {
    audioRef.current.pause();
    setIsMusicPause(true);
  }

  function nextSong() {
    setMusicIndex((prev) => {
      const newIndex = prev === songs.length - 1 ? 0 : prev + 1;
      return newIndex;
    });
    setIsMusicPause(false);
  }

  function prevSong() {
    setMusicIndex((prev) => {
      const newIndex = prev === 0 ? songs.length - 1 : prev - 1;
      return newIndex;
    });
    setIsMusicPause(false);
  }

  function formateTime(time) {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function handleRepeatMode() {
    setRepeatMode((prev) => {
      if (prev === "repeat") return "repeat_one";
      if (prev === "repeat_one") return "shuffle";
      return "repeat";
    });
  }

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showLyrics);
  }, [showLyrics]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const song = songs[musicIndex];
    setMusicName(song.name);
    setMusicArtist(song.artist);
    setMusicImg(song.img);
    setMusicAudio(song.src);
  }, [musicIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (!isMusicPause) {
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [musicAudio, isMusicPause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === "repeat_one") {
        audio.currentTime = 0;
        audio.play();
        return;
      }

      if (repeatMode === "shuffle") {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * songs.length);
        } while (musicIndex === randomIndex);
        setMusicIndex(randomIndex);
        return;
      }
      nextSong();
    };

    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [repeatMode, musicIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [musicAudio]);

  useEffect(() => {
    songs.forEach((song, index) => {
      const audio = new Audio(song.src);

      audio.addEventListener("loadedmetadata", () => {
        setDurations((prev) => ({
          ...prev,
          [index]: audio.duration,
        }));
      });
    });
  }, []);

  useEffect(() => {
    const activeSong = listRefs.current[musicIndex];
    if (activeSong) {
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [musicIndex]);

  useEffect(() => {
    const currentSong = songs[musicIndex];
    if (!currentSong.lyrics) {
      setLyrics("Lyrics Not Available!");
      return;
    }
    fetch(currentSong.lyrics)
      .then((res) => {
        if (!res.ok) {
          throw new Error("File Not Found!");
        }
        return res.text();
      })
      .then((data) => {
        if (!data.trim()) {
          setLyrics("Lyrics Not Found!");
        } else {
          setLyrics(data);
        }
      })
      .catch(() => {
        setLyrics("Lyrics Not Available!");
      });
  }, [musicIndex]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const RepeatIcon =
    repeatMode === "repeat"
      ? Repeat
      : repeatMode === "repeat_one"
        ? Repeat1
        : Shuffle;

  const toggleMusicList = () => {
    setShowMusicList((prev) => !prev);
  };

  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className={`main-container ${theme}`}>
        <div className="wrapper">
          <div className="top-bar">
            <MicVocal
              size={24}
              strokeWidth={1.5}
              className="icon"
              onClick={toggleLyrics}
              style={{ stroke: "url(#iconGradient)" }}
            />
            <span className="text">Now Playing</span>
            {theme === "dark" ? (
              <span
                className="material-symbols-rounded theme-toggle"
                onClick={toggleTheme}
              >
                light_mode
              </span>
            ) : (
              <span
                className="material-symbols-rounded theme-toggle"
                onClick={toggleTheme}
              >
                dark_mode
              </span>
            )}
          </div>
          <div className="img-area">
            <img src={musicImg} alt={musicName} />
          </div>
          <div className="song-details">
            <p className="name">{musicName}</p>
            <p className="artist">{musicArtist}</p>
          </div>
          <div
            className="progress-area"
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || !audio.duration) return;

              const progressArea = e.currentTarget;
              const width = progressArea.clientWidth;
              const clickX = e.nativeEvent.offsetX;
              const duration = audio.duration;

              audio.currentTime = (clickX / width) * duration;

              playMusic();
            }}
          >
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div className="timer">
              <span className="current">{formateTime(currentTime)}</span>
              <span className="duration">{formateTime(duration)}</span>
            </div>
            <audio ref={audioRef} src={musicAudio}></audio>
          </div>
          <div className="controls">
            <RepeatIcon
              size={24}
              strokeWidth={1.5}
              id="repeat"
              className="icon"
              title={
                repeatMode === "repeat"
                  ? `playlist looped`
                  : repeatMode === "repeat_one"
                    ? `song looped`
                    : `playback shuffle`
              }
              style={{ stroke: "url(#iconGradient)" }}
              onClick={handleRepeatMode}
            />
            <SkipBack
              size={28}
              strokeWidth={1.5}
              id="prev"
              className="icon"
              style={{ stroke: "url(#iconGradient)" }}
              onClick={() => {
                prevSong();
              }}
            />
            <div
              className="play-pause"
              onClick={() => {
                if (isMusicPause) {
                  playMusic();
                } else {
                  pauseMusic();
                }
              }}
            >
              {isMusicPause ? (
                <Play
                  size={24}
                  strokeWidth={1.5}
                  className="icon"
                  color="#f6f6f6"
                />
              ) : (
                <Pause
                  size={24}
                  strokeWidth={1.5}
                  className="icon"
                  color="#f6f6f6"
                />
              )}
            </div>
            <SkipForward
              size={28}
              strokeWidth={1.5}
              id="next"
              className="icon"
              style={{ stroke: "url(#iconGradient)" }}
              onClick={() => {
                nextSong();
              }}
            />
            <span
              className="material-symbols-outlined icon text-3xl bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] bg-clip-text text-transparent"
              onClick={toggleMusicList}
            >
              queue_music
            </span>
          </div>
          <div className={`music-list ${showMusicList ? "show" : ""}`}>
            <div className="header">
              <div className="row">
                <i className="material-symbols-outlined cursor-default icon">
                  queue_music
                </i>
                <span>Music List</span>
              </div>
              <X
                size={22}
                strokeWidth={1.5}
                color="var(--text-light)"
                className="close-btn"
                onClick={toggleMusicList}
              />
            </div>
            <ul>
              {songs.map((song, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setMusicIndex(index);
                    setIsMusicPause(false);
                  }}
                  className={
                    index === musicIndex && !isMusicPause ? "playing" : ""
                  }
                  ref={(el) => (listRefs.current[index] = el)}
                >
                  <div className="row">
                    <span>{song.name}</span>
                    <p>{song.artist}</p>
                  </div>
                  <span className="audio-duration">
                    {index === musicIndex && !isMusicPause
                      ? "Playing"
                      : formateTime(durations[index])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`lyrics-panel ${showLyrics ? "open" : ""}`}>
            <div className="container">
              <div className="lyrics-top-bar">
                <div className="flex flex-col">
                  <h3 className="text-[var(--surface)] font-semibold">
                    {musicName}
                  </h3>
                  <p className="text-[var(--surface)] text-sm">
                    By: {musicArtist}
                  </p>
                </div>
                <X
                  size={22}
                  strokeWidth={1.5}
                  color="var(--surface)"
                  className="close-btn"
                  onClick={toggleLyrics}
                />
              </div>
              <div className="lyrics-content">
                <pre>{lyrics}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
