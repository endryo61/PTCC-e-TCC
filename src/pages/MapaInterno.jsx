/**
 * MapaInterno.jsx — Página de mapa do campus
 *
 * Funcionalidades:
 * 1. Mapa visual em grid com blocos do campus (Bloco A/B/C, etc.)
 * 2. Busca por texto
 * 3. Filtro por categoria (Ensino, Adm., Serviços, Acesso, Lazer)
 * 4. Lista de 10 locais em grid de 2 colunas
 *
 * Os dados vêm de data/locations.js (mapLocations e mapCategories).
 *
 * @author IFB NavAR Team
 */
import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import BackButton from '../components/BackButton.jsx'
import { mapLocations, mapCategories } from '../data/locations.js'

export default function MapaInterno() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Filtra locais por categoria e busca
  let filtered = mapLocations
  if (activeCategory !== 'Todos') {
    filtered = filtered.filter((l) => l.category === activeCategory)
  }
  if (search) {
    filtered = filtered.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
  }

  // Configuração dos blocos no mapa visual
  const buildingBlocks = [
    { label: 'BL.A', sub: 'Administrativo', color: 'blue' },
    { label: 'BL.B', sub: 'Salas de Aula', color: 'purple' },
    { label: 'BL.C', sub: 'Laboratórios', color: 'pink' },
    { label: 'Coord.', sub: 'Pedagógica', color: 'orange' },
    { label: '📖 Biblioteca', sub: '', color: 'green' },
    { label: '🍽️ Cantina', sub: '', color: 'teal' },
    { label: '🅿️ Estac.', sub: '', color: 'gray' },
    { label: '🚪 ENTRADA', sub: '', color: 'primary' },
    { label: '⚽ Quadra', sub: '', color: 'yellow' },
  ]

  // Mapeia cores para classes Tailwind
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    pink: 'bg-pink-50 border-pink-200 text-pink-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    teal: 'bg-teal-50 border-teal-200 text-teal-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-600',
    primary: 'bg-ifb-green border-ifb-green-dark text-white',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  }

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <BackButton />

      {/* Título + controles de zoom */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold text-ifb-text">Mapa do Campus</h1>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50 transition-colors" aria-label="Aumentar zoom">
            <Icon name="plus" size={16} strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-full border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50 transition-colors" aria-label="Diminuir zoom">
            <Icon name="minus" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
      <p className="text-ifb-text-light mb-6">IFB Brasília · {mapLocations.length} locais</p>

      {/* Busca */}
      <div className="relative mb-4">
        <Icon name="search" size={18} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ifb-text-light" />
        <input
          type="text"
          placeholder="Buscar local no campus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus:ring-2 focus:ring-ifb-green/30 focus:border-ifb-green transition-all"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mapCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-ifb-green text-white shadow-soft'
                : 'bg-white border border-ifb-border text-ifb-text-light hover:text-ifb-text hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mapa visual do campus */}
      <div className="card p-6 mb-6 overflow-hidden">
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          {/* Grade de fundo */}
          <div className="absolute inset-0 grid grid-cols-12 gap-0" style={{ minHeight: '400px' }}>
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-50" />
            ))}
          </div>

          {/* Blocos do campus */}
          <div className="absolute inset-0 p-4 flex flex-col gap-3 justify-center">
            {[0, 3, 6].map((start) => (
              <div key={start} className="flex gap-3 justify-center">
                {buildingBlocks.slice(start, start + 3).map((block) => (
                  <div
                    key={block.label}
                    className={`border-2 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px] ${colorClasses[block.color]}`}
                  >
                    <p className="text-xs font-bold">{block.label}</p>
                    {block.sub && <p className="text-[10px] opacity-70 mt-0.5">{block.sub}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Controles do mapa */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-lg border border-ifb-border flex items-center justify-center text-xs font-bold text-ifb-text shadow-soft">
            N↑
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] text-ifb-text-light bg-white/80 px-2 py-0.5 rounded">
            Escala 1:500
          </div>
        </div>
      </div>

      {/* Lista de locais */}
      <p className="text-xs text-ifb-text-light uppercase tracking-wider font-medium mb-4">
        {mapLocations.length} locais
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((loc) => (
          <div
            key={loc.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">{loc.icon}</span>
            <div>
              <p className="font-medium text-sm text-ifb-text">{loc.name}</p>
              <p className="text-xs text-ifb-text-light">{loc.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
