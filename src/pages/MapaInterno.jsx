/**
 * MapaInterno.jsx — Página de mapa do campus
 *
 * Funcionalidades:
 * 1. Mapa visual SVG interativo (CampusMap) com edifícios clicáveis
 * 2. Painel de informações do local selecionado
 * 3. Busca por texto
 * 4. Filtro por categoria (pills clicáveis)
 * 5. Lista de locais em grid
 *
 * @author IFB NavAR Team
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import BackButton from '../components/BackButton.jsx'
import CampusMap from '../components/CampusMap.jsx'
import { mapLocations, mapCategories } from '../data/locations.js'

export default function MapaInterno() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedId, setSelectedId] = useState(null)

  // Filtra locais por categoria e busca
  let filtered = mapLocations
  if (activeCategory !== 'Todos') {
    filtered = filtered.filter((l) => l.category === activeCategory)
  }
  if (search) {
    filtered = filtered.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
  }

  const selectedLocation = mapLocations.find((l) => l.id === selectedId)

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

      {/* Mapa visual do campus (SVG) */}
      <div className="card p-4 mb-4 overflow-hidden">
        <CampusMap selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-3 mb-6 px-1">
        {[
          { label: 'Acesso', color: '#22c55e' },
          { label: 'Adm.', color: '#f59e0b' },
          { label: 'Ensino', color: '#3b82f6' },
          { label: 'Serviços', color: '#14b8a6' },
          { label: 'Lazer', color: '#a855f7' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-ifb-text-light">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Painel do local selecionado */}
      {selectedLocation && (
        <div className="card p-5 mb-6 border-ifb-green/30 bg-ifb-green-light/30">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl shrink-0">
              {selectedLocation.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-ifb-text">{selectedLocation.name}</h3>
              <p className="text-sm text-ifb-text-light mt-0.5">
                {selectedLocation.sub || selectedLocation.category}
                {selectedLocation.time && ` · ${selectedLocation.time} de caminhada`}
              </p>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="text-ifb-text-light hover:text-ifb-text transition-colors p-1"
              aria-label="Fechar"
            >
              <Icon name="close" size={18} strokeWidth={2} />
            </button>
          </div>
          <button
            onClick={() => navigate(`/navegacao-ar/${selectedLocation.id}`)}
            className="btn-primary w-full justify-center mt-4"
          >
            <Icon name="ar" size={18} strokeWidth={2} />
            Navegar até aqui
          </button>
        </div>
      )}

      {/* Lista de locais */}
      <p className="text-xs text-ifb-text-light uppercase tracking-wider font-medium mb-3">
        {filtered.length} {filtered.length === 1 ? 'local' : 'locais'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedId(loc.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border bg-white transition-all text-left ${
              selectedId === loc.id
                ? 'border-ifb-green bg-ifb-green-light/50'
                : 'border-ifb-border hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{loc.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-ifb-text">{loc.name}</p>
              <p className="text-xs text-ifb-text-light">{loc.sub || loc.category}</p>
            </div>
            {loc.time && (
              <span className="text-xs font-medium text-ifb-green shrink-0">{loc.time}</span>
            )}
          </button>
        ))}
      </div>

      {/* Estado vazio */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-ifb-text-light">Nenhum local encontrado para "{search}".</p>
        </div>
      )}
    </div>
  )
}
