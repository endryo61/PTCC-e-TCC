import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/scanner', label: 'Escanear', icon: '📷' },
  { to: '/locais', label: 'Locais', icon: '📍' },
  { to: '/acessibilidade', label: 'Acessibilidade', icon: '♿' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ifb-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-ifb-green flex items-center justify-center text-white font-bold text-sm">
            IFB
          </div>
          <div className="leading-tight">
            <span className="font-bold text-ifb-text block">IFB NavAR</span>
            <span className="text-xs text-ifb-text-light">Navegação Acessível</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ifb-green text-white'
                    : 'text-ifb-text-light hover:bg-gray-100'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
