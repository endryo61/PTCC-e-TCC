/**
 * CampusMap.jsx — Mapa visual do campus em SVG
 *
 * Substitui o grid cru anterior por um mapa top-down estilizado:
 * - Edifícios como retângulos arredondados coloridos por categoria
 * - Calçadas (paths tracejadas) conectando os blocos
 * - Áreas verdes com árvores decorativas
 * - Marcador "Você está aqui" com pulso
 * - Bússola e escala
 * - Interativo: clique num edifício para selecioná-lo
 *
 * @param {string} selectedId - ID do edifício selecionado
 * @param {function} onSelect - Callback ao clicar num edifício
 * @author IFB NavAR Team
 */

const CATEGORY_COLORS = {
  'Acesso': '#22c55e',
  'Adm.': '#f59e0b',
  'Ensino': '#3b82f6',
  'Serviços': '#14b8a6',
  'Lazer': '#a855f7',
}

const buildings = [
  { id: 'estacionamento', name: 'Estacionamento', icon: '🅿️', x: 60, y: 25, w: 130, h: 55, cat: 'Acesso' },
  { id: 'entrada', name: 'Entrada', icon: '🚪', x: 300, y: 25, w: 110, h: 50, cat: 'Acesso' },
  { id: 'recepcao', name: 'Recepção', icon: '🏠', x: 300, y: 110, w: 110, h: 42, cat: 'Acesso' },
  { id: 'bloco-a', name: 'Bloco A', icon: '🏢', x: 110, y: 195, w: 120, h: 75, cat: 'Adm.' },
  { id: 'bloco-b', name: 'Bloco B', icon: '📚', x: 295, y: 195, w: 120, h: 75, cat: 'Ensino' },
  { id: 'bloco-c', name: 'Bloco C', icon: '🔬', x: 480, y: 195, w: 120, h: 75, cat: 'Ensino' },
  { id: 'biblioteca-map', name: 'Biblioteca', icon: '📖', x: 110, y: 315, w: 120, h: 55, cat: 'Ensino' },
  { id: 'cantina-map', name: 'Cantina', icon: '🍽️', x: 295, y: 315, w: 120, h: 55, cat: 'Serviços' },
  { id: 'quadra-map', name: 'Quadra', icon: '⚽', x: 480, y: 315, w: 120, h: 55, cat: 'Lazer' },
  { id: 'coord-pedagogica', name: 'Coordenação', icon: '🎓', x: 110, y: 400, w: 120, h: 45, cat: 'Ensino' },
]

const walkways = [
  'M355 75 L355 110',
  'M355 152 L355 195',
  'M230 232 L295 232',
  'M415 232 L480 232',
  'M170 270 L170 315',
  'M355 270 L355 315',
  'M540 270 L540 315',
  'M170 370 L170 400',
]

const trees = [
  [40, 160], [660, 160], [40, 280], [660, 280], [250, 390], [430, 390], [660, 400],
]

export default function CampusMap({ selectedId, onSelect }) {
  return (
    <svg viewBox="0 0 720 480" className="w-full h-auto" style={{ maxHeight: '460px' }}>
      <defs>
        <pattern id="campus-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#e8f0e8" strokeWidth="1" />
        </pattern>
        <filter id="building-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Fundo */}
      <rect width="720" height="480" rx="16" fill="#f3f8f3" />
      <rect width="720" height="480" rx="16" fill="url(#campus-grid)" />

      {/* Áreas verdes */}
      <rect x="20" y="140" width="60" height="200" rx="12" fill="#d9f2dd" opacity="0.6" />
      <rect x="640" y="140" width="60" height="200" rx="12" fill="#d9f2dd" opacity="0.6" />
      <rect x="250" y="380" width="220" height="40" rx="10" fill="#d9f2dd" opacity="0.5" />

      {/* Calçadas */}
      {walkways.map((d, i) => (
        <path key={i} d={d} stroke="#cbd5e1" strokeWidth="4" strokeDasharray="7 5" fill="none" strokeLinecap="round" opacity="0.7" />
      ))}

      {/* Árvores */}
      {trees.map(([cx, cy], i) => (
        <g key={`tree-${i}`}>
          <circle cx={cx} cy={cy} r="11" fill="#bbf0c4" />
          <circle cx={cx} cy={cy} r="7" fill="#4ade80" opacity="0.7" />
          <circle cx={cx - 2} cy={cy - 2} r="3" fill="#86efac" />
        </g>
      ))}

      {/* Edifícios */}
      {buildings.map((b) => {
        const color = CATEGORY_COLORS[b.cat] || '#64748b'
        const isSelected = selectedId === b.id
        return (
          <g
            key={b.id}
            onClick={() => onSelect?.(b.id)}
            className="cursor-pointer transition-all"
            style={{ filter: 'url(#building-shadow)' }}
          >
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="12"
              fill={isSelected ? color : `${color}1a`}
              stroke={color}
              strokeWidth={isSelected ? 3 : 1.8}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="22"
            >
              {b.icon}
            </text>
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 16}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="700"
              fill={isSelected ? '#fff' : color}
            >
              {b.name}
            </text>
          </g>
        )
      })}

      {/* Marcador "Você está aqui" */}
      <g>
        <circle cx="355" cy="50" r="16" fill="#ef4444" opacity="0.25">
          <animate attributeName="r" values="14;20;14" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="355" cy="50" r="8" fill="#ef4444" />
        <circle cx="355" cy="50" r="3.5" fill="#fff" />
      </g>

      {/* Bússola */}
      <g transform="translate(660, 45)">
        <circle r="20" fill="#fff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#building-shadow)" />
        <path d="M0 -14 L-5 2 L0 -4 L5 2 Z" fill="#ef4444" />
        <path d="M0 14 L-5 -2 L0 4 L5 -2 Z" fill="#94a3b8" />
        <text textAnchor="middle" y="-22" fontSize="9" fontWeight="700" fill="#ef4444">N</text>
      </g>

      {/* Escala */}
      <g transform="translate(30, 455)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#64748b" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#64748b" strokeWidth="2" />
        <line x1="60" y1="-4" x2="60" y2="4" stroke="#64748b" strokeWidth="2" />
        <text x="30" y="-8" textAnchor="middle" fontSize="9" fill="#64748b">20m</text>
      </g>
    </svg>
  )
}
