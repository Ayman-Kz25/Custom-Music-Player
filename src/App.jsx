import {
  ChevronDown,
  Ellipsis,
  ListMusic,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react";
import React from "react";

function App() {
  return (
    <div className="main-container">
      <div className="wrapper">
        <div className="top-bar">
          <ChevronDown size={24} strokeWidth={1.5} className="icon" />
          <span>Now Playing</span>
          <Ellipsis size={24} strokeWidth={1.5} className="icon" />
        </div>
        <div className="img-area">
          <img src="./assets/img/lily.jpg" alt="" />
        </div>
        <div className="song-details">
          <p className="name">Lily</p>
          <p className="artist">Alan Walker & K-391 ft. Emelie Hollow</p>
        </div>
        <div className="progress-area">
          <div className="progress-bar">
            <span></span>
            <div className="timer">
              <span className="current">0:20</span>
              <span className="current">3:10</span>
            </div>
            <div className="controls">
              <Repeat
                size={20}
                strokeWidth={1.5}
                id="repeat"
                className="icon"
              />
              <SkipBack
                size={20}
                strokeWidth={1.5}
                id="prev"
                className="icon"
              />
              <div className="play-pause">
                <Play size={20} strokeWidth={1.5} className="icon" />
              </div>
              <SkipForward
                size={20}
                strokeWidth={1.5}
                id="next"
                className="icon"
              />
              <ListMusic
                size={20}
                strokeWidth={1.5}
                id="more-music"
                className="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
