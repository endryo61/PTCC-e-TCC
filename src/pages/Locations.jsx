import { useState } from 'react'
import LocationCard from '../components/LocationCard.jsx'
import { locations } from '../data/locations.js'

export default function Locations() {
  const [search, setSearch] = useState('')

  const filtered = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-ifb-text mb-2">Locais do Campus</h1>
      <p className="text-ifb-text-light mb-6">
        Encontre salas, departamentos e serviços do IFB Brasília.
      </p>

      <input
        type="text"
        placeholder="🔍 Buscar local..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus:ring-2 focus:ring-ifb-green mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
