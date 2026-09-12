/**
 * Home.jsx — Página inicial do IFB NavAR
 *
 * @author IFB NavAR Team
 */
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import FeatureSection from '../components/FeatureSection.jsx'
import StepByStep from '../components/StepByStep.jsx'
import { locations } from '../data/locations.js'

export default function Home() {
  // Locais destacados no visual do hero
  const featured = [
    locations.find((l) => l.id === 'biblioteca'),
    locations.find((l) => l.id === 'registro'),
    locations.find((l) => l.id === 'lab-info'),
  ]

  // Posicionamento dos cards flutuantes ao redor do QR Code
  const cardPositions = [
    'top-0 left-0',
    'bottom-0 left-0',
    'top-1/2 right-0 -translate-y-1/2',
  ]

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <span className="badge mb-5">
              <Icon name="compass" size={14} strokeWidth={2} />
              Navegação AR · IFB Brasília
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-ifb-text leading-[1.15] mb-4 tracking-tight">
              Encontre qualquer lugar no{' '}
              <span className="text-ifb-green">campus IFB</span>
            </h1>
            <p className="text-lg text-ifb-text-light mb-8 max-w-md leading-relaxed">
              Escaneie o QR Code e receba direções em realidade aumentada com guia por voz —
              acessível para todos, incluindo pessoas com deficiência visual.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/scanner" className="btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40">
                <Icon name="scan" size={18} strokeWidth={2} />
                Escanear QR Code
                <Icon name="arrowRight" size={16} strokeWidth={2} />
              </Link>
              <Link to="/acessibilidade" className="btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40">
                <Icon name="volume" size={18} strokeWidth={2} />
                Guia por Voz
              </Link>
            </div>
          </div>

          {/* Visual: QR Code central + cards flutuantes */}
          <div className="relative flex items-center justify-center min-h-[380px]">
            {/* Círculo tracejado de fundo */}
            <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-ifb-border opacity-60" />

            {/* Card central com QR Code */}
            <div className="relative z-10 w-44 h-44 bg-white rounded-lg shadow-soft border border-ifb-border flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-ifb-green flex items-center justify-center text-white">
                <Icon name="qrCode" size={36} strokeWidth={1.5} />
              </div>
              <p className="text-xs text-ifb-text-light font-medium">QR Code</p>
            </div>

            {/* Cards flutuantes de locais */}
            {featured.map((loc, i) => (
              <div
                key={loc.id}
                className={`absolute ${cardPositions[i]} z-20 bg-white rounded-lg shadow-soft border border-ifb-border p-3 flex items-center gap-2.5`}
              >
                <span className="text-xl">{loc.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-ifb-text whitespace-nowrap">{loc.name}</p>
                  <p className="text-xs text-ifb-green font-medium">{loc.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <StepByStep />

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 lg:py-20 bg-ifb-green text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight mb-3">Pronto para se localizar?</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Comece agora a navegar pelo campus IFB com acessibilidade e tecnologia.
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 bg-white text-ifb-green font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Icon name="scan" size={18} strokeWidth={2} />
            Começar agora
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  )
}
