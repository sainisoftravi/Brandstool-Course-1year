# Brandstool-Course-1year

> **Isolated Docker Sandbox for Brandseotool & Online Course Platforms (Udemy, Coursera, Skillshare)**

A containerized environment to safely run the Brandseotool Chrome extension and access course platforms inside an isolated Chromium browser via a web-accessible GUI (KasmVNC). This keeps your host machine (especially work or company laptops) completely clean and protected.

---

## Table of Contents

- [Overview](#overview)
- [Why Use Docker?](#why-use-docker)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
  - [Option A: Windows Batch Scripts](#option-a-windows-batch-scripts-recommended)
  - [Option B: Command Line (Docker CLI)](#option-b-command-line-docker-cli)
  - [Option C: Web Control Dashboard (ON/OFF Page)](#option-c-web-control-dashboard-onoff-page)
- [Loading the Extension in the Browser](#loading-the-extension-in-the-browser)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Security & Isolation Notes](#security--isolation-notes)

---

## Overview

Brandseotool provides access to shared accounts by dynamically modifying network traffic, routing through proxies, and injecting session cookies. 

Running this extension directly on your primary host browser grants it broad permissions across all websites and network requests. This repository runs Chromium entirely inside a Docker container streamed to your browser at `http://localhost:3000`, creating a secure boundary between the extension and your host machine.

---

## Why Use Docker?

1. **Host Isolation:** The extension and its background workers run strictly inside the container. It cannot access your host machine's personal cookies, passwords, company intranet, or local files.
2. **Network Separation:** Proxy routing and header manipulation are contained within the sandbox.
3. **Session Persistence:** All logins and course progress inside Chromium are preserved in the mounted `./chrome-data/` directory.
4. **Simple Turn ON / OFF:** Easily start the container when studying and turn it off when finished.

---

## Prerequisites

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** installed and running.
- **Node.js** (Optional, only needed if you want to use the web-based ON/OFF control panel).

---

## Quick Start

### Option A: Windows Batch Scripts (Recommended)

- **To Turn ON:** Double-click `start-browser.bat`
- **To Turn OFF:** Double-click `stop-browser.bat`

Once started, open your host browser and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Option B: Command Line (Docker CLI)

Open a terminal in this directory:

#### 1. Start the container
```bash
docker compose up -d
```

#### 2. Open the browser interface
Navigate to:
```
http://localhost:3000
```
*(For HTTPS, use `https://localhost:3001`)*

#### 3. Stop the container
```bash
docker compose down
```

#### 4. View container logs
```bash
docker logs -f brandseotool-browser
```

---

### Option C: Web Control Dashboard (ON/OFF Page)

If you prefer a clean web interface with real-time status and ON/OFF buttons:

1. Launch the control server:
   ```bash
   node web-control.js
   ```
2. Open your browser and go to:
   ```
   http://localhost:8080
   ```
3. Use the **Turn ON** and **Turn OFF** buttons to manage the container, and click **Open Isolated Browser GUI** to jump into the browser.

---

## Loading the Extension in the Browser

Once you have opened the browser at `http://localhost:3000`:

1. Open a new tab and navigate to:
   ```
   chrome://extensions
   ```
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left.
4. In the file picker, select the mounted directory:
   ```
   /extension
   ```
5. Click **Select Folder / Open**.
6. The extension is now active. Navigate to `https://tools.brandseotool.com/`, log in, and launch your course tools (Udemy, Coursera, Skillshare).

---

## Project Structure

```text
├── docker-compose.yml     # Docker service configuration (Chromium + KasmVNC)
├── start-browser.bat      # One-click start script for Windows
├── stop-browser.bat       # One-click stop script for Windows
├── web-control.js         # Web control panel server (http://localhost:8080)
├── manifest.json          # Chrome extension manifest (v3)
├── src/                   # Extension source scripts
│   ├── bg.js              # Service worker (proxy, headers, session injection)
│   ├── content.js         # Content script for tools.brandseotool.com
│   ├── content_all.js     # Injected script for managed tool tabs
│   └── default.js         # DevTools detection handler
├── icons/                 # Extension icons
├── default.html           # DevTools monitoring page
├── chrome-data/           # Persistent Chromium profile data (auto-generated, gitignored)
├── .gitignore             # Git ignore configuration
└── README.md              # Project documentation
```

---

## Troubleshooting

### 1. Port Conflict (`Port 3000 or 3001 is already in use`)
- **Cause:** Another local development server or application is using port 3000.
- **Solution:** Edit `docker-compose.yml` and change the host port:
  ```yaml
  ports:
    - "3005:3000"
    - "3006:3001"
  ```
  Then access the browser at `http://localhost:3005`.

---

### 2. Container Name Conflict (`The container name "/brandseotool-browser" is already in use`)
- **Cause:** An older or stopped container with the same name exists.
- **Solution:** Remove the old container using:
  ```bash
  docker rm -f brandseotool-browser
  docker compose up -d
  ```

---

### 3. Session Terminates When Opening Inspect Element (DevTools)
- **Cause:** This is an intentional anti-tamper security feature implemented by the Brandseotool extension (`devtools_page: default.html` and `default.js`).
- **Explanation:** To protect shared account credentials and prevent copying of session tokens, the extension detects when DevTools / Inspect Element (`F12`) is opened and automatically terminates the session or closes the tab.
- **Solution:** Do not open Developer Tools or Inspect Element while active in course sessions.

---

### 4. Chromium Crashes or Blank Screen
- **Cause:** Insufficient shared memory allocation for Chromium inside Docker.
- **Solution:** Ensure `shm_size: "2gb"` is present in `docker-compose.yml`. If running on high-resolution displays, you can increase it to `shm_size: "4gb"`.

---

### 5. Resetting a Corrupted Browser Session
- **Cause:** Stale cookies or corrupted profile data preventing login.
- **Solution:**
  1. Stop the container:
     ```bash
     docker compose down
     ```
  2. Clear the local cache directory:
     ```bash
     # Powershell:
     Remove-Item -Recurse -Force ./chrome-data/*
     ```
  3. Restart the container:
     ```bash
     docker compose up -d
     ```

---

### 6. No Audio Playback in Video Lectures
- **Cause:** The KasmVNC web interface needs permission to stream audio to your host browser.
- **Solution:** 
  1. Look at the top bar or left pull-out menu in `http://localhost:3000`.
  2. Ensure the audio icon is unmuted.
  3. Ensure your host browser tab is allowed to play audio.

---

## Security & Isolation Notes

- **Company / Work Laptop Protection:** By keeping this workflow strictly within Docker, no external extensions, proxy configurations, or unvetted scripts interact with your host operating system or corporate browser profile.
- **Do Not Install on Host:** Avoid installing the unpacked extension on your primary host browser.
- **Profile Data Excluded from Git:** The `./chrome-data/` folder is listed in `.gitignore` to prevent sensitive session tokens or login caches from being pushed to version control.
