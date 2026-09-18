/**
 * CampusMap.jsx — Mapa visual interativo do campus IFB
 *
 * Renderiza os blocos do campus posicionados espacialmente com base
 * nas coordenadas reais, caminhos de circulação, controles de zoom
 * funcionais e interação por clique/toque.
 *
 * @author IFB NavAR Team
 */
import { useState, useRef, useMemo } from 'react'
import Icon from './Icon.jsx'
import { mapLocations, campusOrigin } from '../data/locations.js'

// Cores por categoria — alinhadas com a identidade institucional
const categoryStyles = {
  'Acesso':   { bg: 'bg-amber-50',  border: 'border-amber-300',  text: 'text-amber-800',   dot: 'bg-amber-400' },
  'Adm.':     { bg: 'bg-blue-50',   border: 'border-blue-300',   text: 'text-blue-800',    dot: 'bg-blue-400' },
  'Ensino':   { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', dot: 'bg-emerald-400' },
  'Serviços': { bg: 'bg-teal-50',   border: 'border-teal-300',   text: 'text-teal-800',    dot: 'bg-teal-400' },
  'Lazer':    { bg: 'bg-rose-50',   border: 'border-rose-300',   text: 'text-rose-800',    dot: 'bg-rose-400' },
}

// Posições no grid (percentuais) baseadas nas coordenadas reais do campus
// O mapa é uma área relativa 100% x 100% e cada bloco é posicionado com left/top
const blockPositions = {
  'entrada':          { left: '50%', top: '92%', w: 90, h: 36, label: 'Entrada', icon: '🚪' },
  'recepcao':         { left: '50%', top: '82%', w: 70, h: 34, label: 'Guarita', icon: '🏠' },
  'bloco-a':          { left: '28%', top: '58%', w: 95, h: 50, label: 'Bloco A', icon: '🏢' },
  'bloco-b':          { left: '72%', top: '48%', w: 95, h: 55, label: 'Bloco B', icon: '📚' },
  'bloco-c':          { left: '50%', top: '38%', w: 95, h: 50, label: 'Bloco C', icon: '🔬' },
  'biblioteca-map':   { left: '24%', top: '35%', w: 80, h: 42, label: 'Biblioteca', icon: '📖' },
  'cantina-map':      { left: '76%', top: '70%', w: 80, h: 40, label: 'Cantina', icon: '🍽️' },
  'quadra-map':       { left: '82%', top: '18%', w: 80, h: 46, label: 'Quadra', icon: '⚽' },
  'estacionamento':   { left: '12%', top: '75%', w: 85, h: 38, label: 'Estacion.', icon: '🅿️' },
  'coord-pedagogica': { left: '50%', top: '16%', w: 85, h: 40, label: 'Coordenação', icon: '🎓' },
}

// Caminhos de circulação (pares de ids conectados)
const walkways = [
  ['entrada', 'recepcao'],
  ['recepcao', 'bloco-a'],
  ['recepcao', 'estacionamento'],
  ['bloco-a', 'biblioteca-map'],
  ['bloco-a', 'bloco-c'],
  ['bloco-c', 'bloco-b'],
  ['bloco-c', 'coord-pedagogica'],
  ['bloco-b', 'quadra-map'],
  ['bloco-b', 'cantina-map'],
  ['bloco-c', 'cantina-map'],
]

export default function CampusMap({ selectedId, onSelect, highlightCategory }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6))
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  // Converte posição percentual em coordenada central para desenhar caminhos
  const blockCenter = useMemo(() => {
    const centers = {}
    for (const [id, pos] of Object.entries(blockPositions)) {
      const leftNum = parseFloat(pos.left)
      const topNum = parseFloat(pos.top)
      centers[id] = { x: leftNum, y: topNum }
    }
    return centers
  }, [])

  return (
    <div className="card p-3 sm:p-4 mb-6 overflow-hidden">
      {/* Barra de ferramentas do mapa */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ifb-text uppercase tracking-wider">Vista do Campus</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            aria-label="Diminuir zoom"
          >
            <Icon name="minus" size={16} strokeWidth={2} />
          </button>
          <span className="text-xs text-ifb-text-light tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            aria-label="Aumentar zoom"
          >
            <Icon name="plus" size={16} strokeWidth={2} />
          </button>
          <button
            onClick={handleReset}
            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            aria-label="Restaurar visualização"
            title="Restaurar"
          >
            <Icon name="compass" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Área do mapa */}
      <div
        className="relative w-full overflow-hidden rounded-lg border border-ifb-border bg-ifb-gray select-none"
        style={{ height: '440px' }}
      >
        {/* Camada transformável */}
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: 'center center' }}
        >
          {/* Grade de fundo */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Caminhos de circulação */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {walkways.map(([from, to], i) => {
              const a = blockCenter[from]
              const b = blockCenter[to]
              if (!a || !b) return null
              return (
                <line
                  key={i}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>

          {/* Áreas verdes decorativas */}
          <div className="absolute rounded-full bg-emerald-100/40" style={{ left: '5%', top: '10%', width: '70px', height: '70px' }} />
          <div className="absolute rounded-full bg-emerald-100/40" style={{ right: '5%', top: '60%', width: '50px', height: '50px' }} />
          <div className="absolute rounded-full bg-emerald-100/30" style={{ left: '40%', top: '72%', width: '60px', height: '60px' }} />

          {/* Blocos do campus */}
          {mapLocations.map((loc) => {
            const pos = blockPositions[loc.id]
            if (!pos) return null
            const style = categoryStyles[loc.category] || categoryStyles['Ensino']
            const isSelected = selectedId === loc.id
            const isDimmed = highlightCategory && highlightCategory !== 'Todos' && loc.category !== highlightCategory

            return (
              <button
                key={loc.id}
                onClick={() => onSelect?.(loc)}
                className={`absolute ${style.bg} ${style.border} ${style.text} border-2 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:shadow-soft hover:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/50 ${
                  isSelected ? 'ring-2 ring-ifb-green shadow-card-hover z-10 scale-105' : ''
                } ${isDimmed ? 'opacity-30' : ''}`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: `${pos.w}px`,
                  height: `${pos.h}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`${pos.label} — ${loc.category}. Toque para navegar.`}
                aria-pressed={isSelected}
              >
                <span className="text-base leading-none">{pos.icon}</span>
                <span className="text-[10px] font-bold leading-tight">{pos.label}</span>
              </button>
            )
          })}
        </div>

        {/* Bússola */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-lg border border-ifb-border flex items-center justify-center text-xs font-bold text-ifb-text shadow-soft pointer-events-none">
          N↑
        </div>

        {/* Escala */}
        <div className="absolute bottom-2 right-2 text-[10px] text-ifb-text-light bg-white/80 px-2 py-0.5 rounded pointer-events-none">
          Escala 1:500
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 px-1">
        {Object.entries(categoryStyles).map(([cat, style]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${style.dot}`} />
            <span className="text-xs text-ifb-text-light font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
