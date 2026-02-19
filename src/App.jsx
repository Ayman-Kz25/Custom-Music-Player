import {
  ChevronDown,
  Ellipsis,
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
import { useEffect, useRef, useState } from "react";
import songs from "./songs.json";

function App() {
  const [musicName, setMusicName] = useState("");
  const [musicArtist, setMusicArtist] = useState("");
  const [musicImg, setMusicImg] = useState(null);
  const [musicAudio, setMusicAudio] = useState(null);
  const [isMusicPause, setIsMusicPause] = useState(true);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicIndex, setMusicIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState("repeat");
  const [showMusicList, setShowMusicList] = useState(false);

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
  }

  function prevSong() {
    setMusicIndex((prev) => {
      const newIndex = prev === 0 ? songs.length - 1 : prev - 1;
      return newIndex;
    });
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

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const RepeatIcon =
    repeatMode === "repeat"
      ? Repeat
      : repeatMode === "repeat_one"
        ? Repeat1
        : Shuffle;

  
  const toggleMusicList = () => {
    setShowMusicList(prev => !prev);
  }

  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF74A4" />
            <stop offset="100%" stopColor="#9F6EA3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="main-container">
        <div className="wrapper">
          <div className="top-bar">
            <ChevronDown size={24} strokeWidth={1.5} className="icon" />
            <span>Now Playing</span>
            <Ellipsis size={24} strokeWidth={1.5} className="icon" />
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
              onClick={() => prevSong()}
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
              onClick={() => nextSong()}
            />
            <span className="material-symbols-outlined icon text-3xl bg-gradient-to-r from-[var(--pink)] to-[var(--violet)] bg-clip-text text-transparent">
              queue_music
            </span>
          </div>
          <div className={`music-list ${showMusicList ? "show" : ""}`}>
            <div className="header">
              <div className="row">
                <i
                  className="material-symbols-outlined cursor-default icon"
                  onClick={toggleMusicList}
                >
                  queue_music
                </i>
                <span>Music List</span>
              </div>
              <X
                size={22}
                strokeWidth={1.5}
                color="var(--lightblack)"
                className="cursor-pointer"
                onClick={toggleMusicList}
              />
            </div>
            <ul>
              <li>
                <div className="row">
                  <span></span>
                  <p></p>
                </div>
                <span className="audio-duration"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
