import {
  ChevronDown,
  Ellipsis,
  ListMusic,
  Music,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";

import "material-symbols/outlined.css";

import lily from "./assets/img/lily.jpg";

function App() {
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
            <img src={lily} alt="Lily" />
          </div>
          <div className="song-details">
            <p className="name">Lily - Different World</p>
            <p className="artist">Alan Walker & K-391 ft. Emelie Hollow</p>
          </div>
          <div className="progress-area">
            <div className="progress-bar"></div>
            <div className="timer">
              <span className="current">0:20</span>
              <span className="current">3:10</span>
            </div>
          </div>
          <div className="controls">
            <Repeat
              size={24}
              strokeWidth={1.5}
              id="repeat"
              className="icon"
              style={{ stroke: "url(#iconGradient)" }}
            />
            <SkipBack
              size={28}
              strokeWidth={1.5}
              id="prev"
              className="icon"
              style={{ stroke: "url(#iconGradient)" }}
            />
            <div className="play-pause">
              <Play
                size={24}
                strokeWidth={1.5}
                className="icon"
                color="#f6f6f6"
              />
            </div>
            <SkipForward
              size={28}
              strokeWidth={1.5}
              id="next"
              className="icon"
              style={{ stroke: "url(#iconGradient)" }}
            />
            <span className="material-symbols-outlined icon text-2xl bg-gradient-to-r from-[var(--pink)] to-[var(--violet)] bg-clip-text text-transparent">
              queue_music
            </span>
          </div>
          <div className="music-list">
            <div className="header">
              <div className="row">
                <i className="material-symbols-outlined cursor-default">
                  queue_music
                </i>
                <span>Music List</span>
              </div>
              <X size={22} strokeWidth={1.5} color="var(--lightblack)" className="cursor-pointer"/>
            </div>
            <ul>
              <li>
                <div className="row">
                  <span>Alone, Pt. II</span>
                  <p>Alan Walker & Ava Max</p>
                </div>
                <span className="audio-duration">3:40</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
