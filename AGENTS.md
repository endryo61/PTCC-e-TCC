# IFB NavAR — Base44 Dev Environment

## Overview
Frontend-only Vite + React app. No backend, no database, no external secrets needed.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
App is served on port 3000 (mapped to Vite dev server on 5173).

## Tech Stack
- Vite 5 + React 18 + React Router 6
- Tailwind CSS 3
- html5-qrcode for QR code scanning (getUserMedia)
- Web Speech API (speechSynthesis + SpeechRecognition) for voice features
- PWA with manifest.json + service worker

## Pages
- `/` — Home (landing page with hero, features, step-by-step)
- `/scanner` — QR Code scanner with camera
- `/locais` — List of campus locations with search
- `/acessibilidade` — Voice guide, voice command, accessible routes

## Verification
- Check `docker compose ps` for healthy web service
- curl `localhost:3000` returns the app HTML
- QR scanner needs camera permission (works on mobile/HTTPS)
- Voice features need browser support for Web Speech API
