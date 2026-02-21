# 🎵 React Music Player App

A modern, responsive Music Player built with React and Tailwind CSS, featuring theme switching, lyrics support, playlist controls, and smooth UI interactions.

## 🚀 Overview

This project is a custom-built music player that uses the native HTML <audio> element combined with React state management for playback control and UI synchronization.

The application focuses on clean UI design, smooth interactions, and structured state handling without relying on third-party audio libraries.

## ✨ Features

* 🎲 Random song on page refresh
* ⏯ Play / Pause functionality
* ⏭ Next / Previous track navigation
* 🔁 Repeat playlist mode
* 🔂 Repeat single track mode
* 🔀 Shuffle playback mode
* 📜 Animated lyrics panel with dynamic fetch
* 📂 Toggleable playlist panel
* 🎨 Light / Dark theme toggle
* 📍 Scroll-to-active song behavior
* ⏱ Real-time progress tracking & click-to-seek

## 🛠 Tech Stack

- React (Hooks: useState, useEffect, useRef)
- Vite
- Tailwind CSS
- Lucide React Icons
- Material Symbols

## 📂 Project Structure

```
src/
 ├── App.jsx
 ├── songs.json
 ├── index.css
 └── assets/
```

## Project Demonstrates

* Managing audio playback with React state
* Handling multiple playback modes (repeat, repeat one, shuffle)
* Synchronizing UI with media events (timeupdate, ended, loadedmetadata)
* Dynamic lyrics loading with fetch
* Scroll management using useRef
* Clean component-level state logic

## 📦 Installation

#### Clone the repository
```
git clone https://github.com/Ayman-Kz25/Custom-Music-Player.git
```

#### Navigate into the folder
```
cd your-project-name
```

#### Install dependencies
```
npm install
```

#### Start development server
```
npm run dev
```

## 🌐 Live Demo

https://custom-music-player-nine.vercel.app/