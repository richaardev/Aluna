# Aluna

**Aluna** is a Discord music bot built with TypeScript and discord.js, using **Lavalink** for high-quality audio playback. It provides a full music player experience with slash commands.

## Features

- 🎵 Audio playback via Lavalink (SoundCloud, Bandcamp, Twitch, Vimeo and HTTP streaming)
- ⏯️ Full player controls (play, pause, resume, skip, stop, seek, volume)
- 🔁 Track loop system
- 🎚️ Bass boost adjustment (Off / Low / Medium / High / Ultra / Insane)
- 🖼️ Dynamic `nowplaying` canvas image generation
- ⚡ Slash (/) and prefix (`a!`) commands

## Preview

<video src="https://github.com/user-attachments/assets/83f0c129-eb30-4f6e-9c51-bbdb5b653bd5" controls preload></video>

## Commands

### Music

| Command | Description |
|---|---|
| `/play` | Play a song or add to queue (URL or name) |
| `/skip` | Skip to the next track |
| `/stop` | Stop playback and clear the queue |
| `/pause` | Pause the current track |
| `/resume` | Resume the paused track |
| `/join` | Join your voice channel |
| `/disconnect` | Disconnect from the voice channel |
| `/loop` | Toggle track looping |
| `/nowplaying` | Show the currently playing track |
| `/queue` | Show the upcoming tracks queue |
| `/volume` | Adjust volume (0–150) |
| `/seek` | Seek within the track (`10s`, `3m`, `1h`, `50%`) |
| `/bassboost` | Adjust bass boost intensity |


## How to Run

### Prerequisites

- Node.js 22+
- pnpm
- Docker (for Lavalink)

### 1. Start Lavalink

```bash
docker compose up -d
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run in development

```bash
pnpm dev
```

### Build and run

```bash
pnpm build && pnpm start
```
