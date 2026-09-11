import { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import { mapLocations, mapCategories } from '../data/locations.js'

export default function MapaInterno() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  let filtered = mapLocations
  if (activeCategory !== 'Todos') {
    filtered = filtered.filter((l) => l.category === activeCategory)
  }
  if (search) {
    filtered = filtered.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <BackButton />
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold text-ifb-text">Mapa do Campus</h1>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50">+</button>
          <button className="w-9 h-9 rounded-full border border-ifb-border bg-white flex items-center justify-center text-ifb-text hover:bg-gray-50">−</button>
        </div>
      </div>
      <p className="text-ifb-text-light mb-6">IFB Brasília · {mapLocations.length} locais</p>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Buscar local no campus..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus:ring-2 focus:ring-ifb-green mb-4"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mapCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-ifb-green text-white'
                : 'bg-white border border-ifb-border text-ifb-text-light hover:text-ifb-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campus map */}
      <div className="bg-white rounded-2xl border border-ifb-border p-6 mb-6 overflow-hidden">
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          {/* Grid background */}
          <div className="absolute inset-0 grid grid-cols-12 gap-0" style={{ minHeight: '400px' }}>
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-100" />
            ))}
          </div>

          {/* Building blocks */}
          <div className="absolute inset-0 p-4 flex flex-col gap-3">
            {/* Top row */}
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-blue-800">BL.A</p>
                <p className="text-[10px] text-blue-600">Administrativo</p>
              </div>
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-purple-800">BL.B</p>
                <p className="text-[10px] text-purple-600">Salas de Aula</p>
              </div>
              <div className="bg-pink-100 border-2 border-pink-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-pink-800">BL.C</p>
                <p className="text-[10px] text-pink-600">Laboratórios</p>
              </div>
            </div>

            {/* Middle row */}
            <div className="flex gap-3 justify-center">
              <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-orange-800">Coord.</p>
                <p className="text-[10px] text-orange-600">Pedagógica</p>
              </div>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-green-800">📖 Biblioteca</p>
              </div>
              <div className="bg-teal-100 border-2 border-teal-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-teal-800">🍽️ Cantina</p>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex gap-3 justify-center">
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-gray-700">🅿️ Estac.</p>
              </div>
              <div className="bg-ifb-green border-2 border-ifb-green-dark rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-white">🚪 ENTRADA</p>
              </div>
              <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg px-4 py-3 text-center flex-1 max-w-[140px]">
                <p className="text-xs font-bold text-yellow-800">⚽ Quadra</p>
              </div>
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-lg border border-ifb-border flex items-center justify-center text-xs font-bold text-ifb-text">
            N↑
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] text-ifb-text-light bg-white/80 px-2 py-0.5 rounded">
            Escala 1:500
          </div>
        </div>
      </div>

      {/* Location list */}
      <p className="text-xs text-ifb-text-light uppercase tracking-wide font-medium mb-4">
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
