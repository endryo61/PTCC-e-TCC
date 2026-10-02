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

## Design tokens
- As cores vivem em variáveis CSS em `src/index.css` (`--ifb-*`, em canais RGB) e o
  `tailwind.config.js` aponta para elas. É isso que permite Alto Contraste e Daltonismo
  trocarem a paleta em todo o app; não volte a hex fixo no config.
- Animações da identidade "Verde ao ar livre" (`rise`, `bob`, `orbit`) ficam em
  `src/index.css` e são desligadas por `body.reduce-animations` e por `prefers-reduced-motion`.

## Accessibility
- "Texto Grande" muda a fonte raiz do `html` no `AccessibilityProvider` — as medidas do
  Tailwind são em rem, então mexer só no `body` não escala nada.

## Notas de setup
- O service worker do PWA só é registrado em produção; em dev o `src/main.jsx` desregistra
  SWs antigos e limpa caches (um SW velho serve módulos do Vite obsoletos e trava o preview).
- Mudanças no `tailwind.config.js` exigem `docker compose restart web` (o PostCSS cacheia o config).

## Verification
- Check `docker compose ps` for healthy web service
- curl `localhost:3000` returns the app HTML
- QR scanner needs camera permission (works on mobile/HTTPS)
- Voice features need browser support for Web Speech API
