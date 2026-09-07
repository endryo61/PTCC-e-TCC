import { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import LocationCard from '../components/LocationCard.jsx'
import { locations, categories } from '../data/locations.js'

export default function Locations() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

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

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Buscar local..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus:ring-2 focus:ring-ifb-green mb-4"
      />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ifb-text-light py-12">
          Nenhum local encontrado para "{search}".
        </p>
      )}
    </div>
  )
}
