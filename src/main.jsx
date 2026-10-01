import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Em desenvolvimento, remove service workers e caches antigos de builds anteriores:
// um SW do PWA serviria módulos do Vite obsoletos e travaria o carregamento do preview.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()))
  if (window.caches) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)))
  }
}

// Service worker (PWA) — apenas em produção.
// Em desenvolvimento/preview ele serviria módulos do Vite obsoletos do cache,
// duplicando o React e quebrando a página.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
