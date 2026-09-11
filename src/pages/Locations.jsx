/**
 * Locations.jsx — Página de listagem de locais do campus
 *
 * Funcionalidades:
 * 1. Busca por texto (nome ou descrição)
 * 2. Filtro por categoria (pills clicáveis)
 * 3. Grid de cards (LocationCard)
 *
 * Para adicionar um local: edite data/locations.js
 * Para adicionar uma categoria: edite o array `categories` em data/locations.js
 *
 * @author IFB NavAR Team
 */
import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import BackButton from '../components/BackButton.jsx'
import LocationCard from '../components/LocationCard.jsx'
import { locations, categories } from '../data/locations.js'

export default function Locations() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Filtra locais por categoria e termo de busca
  let filtered = locations
  if (activeCategory !== 'Todos') {
    filtered = filtered.filter((l) => l.category === activeCategory)
  }
  if (search) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-ifb-text mb-1">Locais do Campus</h1>
      <p className="text-ifb-text-light mb-6">IFB Brasília · {locations.length} locais</p>

      {/* Campo de busca */}
      <div className="relative mb-4">
        <Icon name="search" size={18} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ifb-text-light" />
        <input
          type="text"
          placeholder="Buscar local..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus:ring-2 focus:ring-ifb-green/30 focus:border-ifb-green transition-all"
        />
      </div>

      {/* Filtros por categoria */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
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

      {/* Grid de locais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>

      {/* Estado vazio */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ifb-green-light flex items-center justify-center text-ifb-green">
            <Icon name="search" size={28} strokeWidth={1.5} />
          </div>
          <p className="text-ifb-text-light">Nenhum local encontrado para "{search}".</p>
        </div>
      )}
    </div>
  )
}
