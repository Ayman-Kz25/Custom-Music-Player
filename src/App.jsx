import { ChevronDown, Ellipsis, ListMusic, Play, Repeat, SkipBack, SkipForward } from 'lucide-react'
import React from 'react'

function App() {
  return (
    <div class="main-container">
        <div class="wrapper">
            <div class="top-bar">
                <ChevronDown />
                <span>Now Playing</span>
                <Ellipsis />
            </div>
            <div class="img-area">
                <img src="./assets/song-cover-img/lily.jpg" alt="" />
                <div class="song-details">
                    <p class="name">Lily</p>
                    <p class="artist">Alan Walker & K-391 ft. Emelie Hollow</p>
                </div>
                <div class="progress-area">
                    <div class="progress-bar">
                        <span></span>
                        <div class="timer">
                            <span class="current">0:20</span>
                            <span class="current">3:10</span>
                        </div>
                        <div class="controls">
                            <Repeat id="repeat" />
                            <SkipBack id="prev" />
                            <div class="play-pause">
                              <Play />
                            </div>
                            <SkipForward id="next" />
                            <ListMusic id="more-music" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App