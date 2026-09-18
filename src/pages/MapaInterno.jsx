/**
 * MapaInterno.jsx — Página de mapa do campus
 *
 * Mapa visual interativo com blocos posicionados espacialmente,
 * caminhos de circulação, zoom funcional e integração com a lista
 * de locais para navegação.
 *
 * @author IFB NavAR Team
 */
import { useState, useRef, useEffect } from 'react'
import Icon from '../components/Icon.jsx'
import BackButton from '../components/BackButton.jsx'
import NavigationModal from '../components/NavigationModal.jsx'
import CampusMap from '../components/CampusMap.jsx'
import { mapLocations, mapCategories } from '../data/locations.js'

export default function MapaInterno() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedLocation, setSelectedLocation] = useState(null) // para o modal
  const [mapSelectedId, setMapSelectedId] = useState(null) // highlight no mapa
  const listRefs = useRef({})

  // Filtra locais por categoria e busca
  let filtered = mapLocations
  if (activeCategory !== 'Todos') {
    filtered = filtered.filter((l) => l.category === activeCategory)
  }
  if (search) {
    filtered = filtered.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
  }

  // Quando um bloco do mapa é clicado, destaca na lista e rola até ele
  const handleMapSelect = (loc) => {
    setMapSelectedId(loc.id)
    // Garante que o filtro não esconde o local clicado
    if (activeCategory !== 'Todos' && loc.category !== activeCategory) {
      setActiveCategory('Todos')
      setSearch('')
    }
    // Rola a lista até o item (após re-render)
    setTimeout(() => {
      listRefs.current[loc.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }

  // Quando um item da lista é clicado, abre o modal de navegação
  const handleListClick = (loc) => {
    setMapSelectedId(loc.id)
    setSelectedLocation(loc)
  }

  // Limpa o destaque do mapa quando o modal fecha
  useEffect(() => {
    if (!selectedLocation) {
      // Mantém o destaque por 1s após fechar para feedback visual
      const t = setTimeout(() => setMapSelectedId(null), 1000)
      return () => clearTimeout(t)
    }
  }, [selectedLocation])

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <BackButton />

      {/* Título */}
      <div className="mb-1">
        <h1 className="text-2xl font-bold tracking-tight text-ifb-text">Mapa do Campus</h1>
      </div>
      <p className="text-ifb-text-light mb-6">IFB Brasília · {mapLocations.length} locais · toque em um bloco para navegar</p>

      {/* Busca */}
      <div className="relative mb-4">
        <Icon name="search" size={18} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ifb-text-light" />
        <input
          type="text"
          placeholder="Buscar local no campus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-ifb-border bg-white text-ifb-text placeholder:text-ifb-text-light focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 focus:border-ifb-green transition-all"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mapCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
              activeCategory === cat
                ? 'bg-ifb-green text-white shadow-soft'
                : 'bg-white border border-ifb-border text-ifb-text-light hover:text-ifb-text hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mapa visual interativo */}
      <CampusMap
        selectedId={mapSelectedId}
        onSelect={handleMapSelect}
        highlightCategory={activeCategory}
      />

      {/* Lista de locais */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-ifb-text-light uppercase tracking-wider font-medium">
          {filtered.length} {filtered.length === 1 ? 'local' : 'locais'}
        </p>
        <p className="text-xs text-ifb-text-light">Toque para navegar</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((loc) => (
          <button
            key={loc.id}
            ref={(el) => (listRefs.current[loc.id] = el)}
            onClick={() => handleListClick(loc)}
            className={`flex items-center gap-3 p-3 rounded-lg border bg-white transition-all text-left min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
              mapSelectedId === loc.id
                ? 'border-ifb-green bg-ifb-green-light ring-1 ring-ifb-green/30'
                : 'border-ifb-border hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl shrink-0">{loc.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-ifb-text">{loc.name}</p>
              <p className="text-xs text-ifb-text-light">
                {loc.time && <span className="font-medium text-ifb-green">{loc.time}</span>}
                {loc.distance && <span> · {loc.distance}</span>}
                {loc.sub && <span> · {loc.sub}</span>}
              </p>
            </div>
            <Icon name="chevronRight" size={16} strokeWidth={2} className="text-ifb-text-light shrink-0" />
          </button>
        ))}
      </div>

      {/* Modal de navegação */}
      <NavigationModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
    </div>
  )
}
