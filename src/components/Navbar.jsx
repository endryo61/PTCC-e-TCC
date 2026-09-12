/**
 * Navbar.jsx — Barra de navegação superior do app
 *
 * @author IFB NavAR Team
 */
import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'

const navItems = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/scanner', label: 'Escanear', icon: 'scan' },
  { to: '/locais', label: 'Locais', icon: 'pin' },
  { to: '/mapa-interno', label: 'Mapa Interno', icon: 'map' },
  { to: '/acessibilidade', label: 'Acessibilidade', icon: 'accessibility' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ifb-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + nome do app */}
        <NavLink to="/" className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40">
          <div className="w-9 h-9 rounded-lg bg-ifb-green flex items-center justify-center text-white font-bold text-sm tracking-tight">
            IFB
          </div>
          <div className="leading-tight">
            <span className="font-bold text-ifb-text block text-[15px]">IFB NavAR</span>
            <span className="text-[11px] text-ifb-text-light">Navegação Acessível</span>
          </div>
        </NavLink>

        {/* Links de navegação em container pill */}
        <div className="flex items-center gap-0.5 bg-gray-100/80 rounded-full p-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
                  isActive
                    ? 'bg-ifb-green text-white shadow-soft'
                    : 'text-ifb-text-light hover:text-ifb-text hover:bg-white/60'
                }`
              }
            >
              <Icon name={item.icon} size={16} strokeWidth={2} />
              <span className="hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
