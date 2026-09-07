import { Link } from 'react-router-dom'
import FeatureSection from '../components/FeatureSection.jsx'
import StepByStep from '../components/StepByStep.jsx'
import { locations } from '../data/locations.js'

export default function Home() {
  const featured = [
    { ...locations.find((l) => l.id === 'biblioteca') },
    { ...locations.find((l) => l.id === 'registro') },
    { ...locations.find((l) => l.id === 'lab-info') },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-4">✈️ Navegação AR · IFB Brasília</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-ifb-text leading-tight mb-4">
              Encontre qualquer lugar no <span className="text-ifb-green">campus IFB</span>
            </h1>
            <p className="text-lg text-ifb-text-light mb-8 max-w-md">
              Escaneie o QR Code e receba direções em realidade aumentada com guia por voz —
              acessível para todos, incluindo pessoas com deficiência visual.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/scanner" className="btn-primary">
                📷 Escanear QR Code →
              </Link>
              <Link to="/acessibilidade" className="btn-outline">
                🔊 Guia por Voz
              </Link>
            </div>
          </div>

          {/* Visual: QR Code center + floating location cards */}
          <div className="relative flex items-center justify-center min-h-[360px]">
            <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-ifb-border"></div>
            <div className="relative z-10 w-40 h-40 bg-white rounded-2xl shadow-lg border border-ifb-border flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-ifb-green flex items-center justify-center text-white text-3xl">
                📱
              </div>
              <p className="text-xs text-ifb-text-light text-center px-2 font-medium">
                QR Code
              </p>
            </div>
            {featured.map((loc, i) => {
              const positions = [
                'top-2 left-2',
                'bottom-2 left-2',
                'top-1/2 right-0 -translate-y-1/2',
              ]
              return (
                <div
                  key={loc.id}
                  className={`absolute ${positions[i]} z-20 bg-white rounded-xl shadow-md border border-ifb-border p-3 flex items-center gap-2`}
                >
                  <span className="text-xl">{loc.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-ifb-text">{loc.name}</p>
                    <p className="text-xs text-ifb-green font-medium">{loc.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FeatureSection />
      <StepByStep />

      {/* CTA */}
      <section className="py-16 bg-ifb-green text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para se localizar?</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Comece agora a navegar pelo campus IFB com acessibilidade e tecnologia.
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 bg-white text-ifb-green font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            📷 Começar agora →
          </Link>
        </div>
      </section>
    </div>
  )
}
