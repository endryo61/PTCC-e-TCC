/**
 * Navbar.jsx — Barra de navegação superior do app
 *
 * Contém o logo do IFB NavAR e links para todas as páginas.
 * Usa NavLink do react-router para destacar a página ativa.
 * O container pill agrupa os links em um design moderno.
 *
 * Para adicionar uma nova página:
 * 1. Adicione uma entrada em `navItems` abaixo
 * 2. Adicione a rota correspondente em App.jsx
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
      <nav className="max-w-6xl mx-auto px-4 h-[72px] lg:h-[82px] flex items-center justify-between gap-3">
        {/* Logo + nome do app */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-[42px] h-[42px] rounded-[14px] bg-ifb-green flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-[0_7px_16px_#3fa86a35]">
            IFB
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-ifb-text block text-[15px]">IFB NavAR</span>
            <span className="text-[11px] text-ifb-text-light block">Navegação Acessível</span>
          </div>
        </NavLink>

        {/* Links de navegação em container pill */}
        <div className="flex items-center gap-0.5 lg:gap-1.5 bg-ifb-green-light rounded-full p-1 lg:p-1.5 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 lg:px-3.5 py-2 lg:py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 ${
                  isActive
                    ? 'bg-ifb-green text-white shadow-[0_4px_10px_#3fa86a38]'
                    : 'text-ifb-text-light hover:bg-white/70 hover:text-ifb-text'
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
