/**
 * osrm.js — Serviço de roteamento OSRM (OpenStreetMap)
 *
 * Usa a API pública do OSRM para calcular rotas a pé entre dois pontos
 * com distância e tempo reais.
 *
 * API: https://router.project-osrm.org/route/v1/foot/{lon1},{lat1};{lon2},{lat2}
 *
 * @author IFB NavAR Team
 */

const OSRM_BASE = 'https://router.project-osrm.org'

/**
 * Busca uma rota a pé entre dois pontos usando OSRM.
 *
 * @param {{lat: number, lon: number}} origin  — ponto de origem
 * @param {{lat: number, lon: number}} dest    — ponto de destino
 * @returns {Promise<{distance: number, duration: number, steps: Array, geometry: Array} | null>}
 *   distance em metros, duration em segundos, steps com instruções, geometry com [lon, lat]
 */
export async function fetchRoute(origin, dest) {
  if (!origin || !dest || !origin.lat || !dest.lat) return null

  const url = `${OSRM_BASE}/route/v1/foot/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=full&geometries=geojson&steps=true`

  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.length) return null

    const route = data.routes[0]
    const leg = route.legs?.[0]

    // Traduz os passos (steps) do OSRM para instruções em português
    const steps = (leg?.steps || []).map((s) => ({
      instruction: maneuverToPtBR(s.maneuver?.type, s.maneuver?.modifier, s.name),
      distance: Math.round(s.distance),
      duration: Math.round(s.duration),
    }))

    return {
      distance: Math.round(route.distance),   // metros
      duration: Math.round(route.duration),     // segundos
      steps,
      geometry: route.geometry?.coordinates || [], // [[lon, lat], ...]
    }
  } catch (err) {
    console.error('OSRM fetch error:', err)
    return null
  }
}

/**
 * Converte manobras do OSRM em instruções em português.
 */
function maneuverToPtBR(type, modifier, name) {
  const street = name ? ` em ${name}` : ''
  const dir = {
    left: 'à esquerda',
    right: 'à direita',
    'sharp left': 'totalmente à esquerda',
    'sharp right': 'totalmente à direita',
    'slight left': 'levemente à esquerda',
    'slight right': 'levemente à direita',
    straight: 'em frente',
    uturn: 'retornando',
  }[modifier] || ''

  switch (type) {
    case 'depart': return `Inicie a rota${street}`
    case 'arrive': return 'Você chegou ao seu destino'
    case 'turn': return `Vire ${dir}${street}`
    case 'new name': return `Continue${street}`
    case 'merge': return `Entre${street}`
    case 'on ramp': return `Pegue a entrada${street}`
    case 'off ramp': return `Pegue a saída${street}`
    case 'fork': return `Mantenha-se ${dir}${street}`
    case 'end of road': return `No final da via, vire ${dir}${street}`
    case 'continue': return `Continue ${dir}${street}`
    case 'roundabout': return `Entre na rotatória${street}`
    case 'rotary': return `Entre na rotatória${street}`
    case 'roundabout turn': return `Na rotatória, vire ${dir}${street}`
    case 'exit roundabout': return `Saia da rotatória${street}`
    case 'exit rotary': return `Saia da rotatória${street}`
    default: return `Continue${street}`
  }
}

/**
 * Formata segundos em string de tempo legível (ex: "3 min", "1 min 30 s").
 */
export function formatDuration(seconds) {
  if (seconds < 60) return `${seconds} s`
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  if (sec === 0) return `${min} min`
  return `${min} min ${sec} s`
}

/**
 * Formata metros em string de distância legível (ex: "150 m", "1,2 km").
 */
export function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}
