/**
 * sw.js — Service Worker do IFB NavAR (PWA)
 *
 * Registrado apenas em produção (ver src/main.jsx).
 * - Navegação (HTML): network-first, para sempre pegar a versão atual.
 * - Demais assets: cache-first.
 */
const CACHE = 'ifb-navar-v2'
const ASSETS = ['/manifest.json', '/icon.svg']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  // Ignora requisições não-GET e de outras origens
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return

  // Navegação (HTML): network-first
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('/')))
    return
  }

  // Assets: cache-first
  e.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(request, clone))
          }
          return res
        })
    )
  )
})
