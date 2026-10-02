/**
 * Home.jsx — Página inicial do IFB NavAR
 *
 * Estrutura:
 * 1. Hero — título, subtítulo, CTAs e visual com foto do campus, QR Code + cards flutuantes
 * 2. FeatureSection — grade de funcionalidades
 * 3. StepByStep — passo a passo de uso
 * 4. CTA — chamada final para ação
 *
 * Direção visual "Verde ao ar livre": fundo creme, verde de destaque,
 * foto do campus no herói, movimento suave de entrada.
 *
 * @author IFB NavAR Team
 */
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import FeatureSection from '../components/FeatureSection.jsx'
import StepByStep from '../components/StepByStep.jsx'
import { locations } from '../data/locations.js'

// Fotos do campus IFB Brasília (biblioteca de imagens do app)
const CAMPUS_PHOTO =
  'https://media.base44.com/images/public/6a9f3f9cdb132332b0b48a9c/1455f2751_generated_37039d62.jpg'
const CAMPUS_FACADE =
  'https://media.base44.com/images/public/6a9f3f9cdb132332b0b48a9c/8c5825656_generated_80c7770d.jpg'

export default function Home() {
  // Locais destacados no visual do hero
  const featured = [
    locations.find((l) => l.id === 'biblioteca'),
    locations.find((l) => l.id === 'registro'),
    locations.find((l) => l.id === 'lab-info'),
  ]

  // Posicionamento dos cards flutuantes ao redor do QR Code
  const cardPositions = [
    'top-[57px] left-6',
    'bottom-12 left-[30px]',
    'right-5 top-[179px]',
  ]

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="bg-ifb-cream pt-[56px] pb-[76px]">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_1.02fr] gap-[52px] items-center">
          {/* Texto */}
          <div className="py-3">
            <span className="badge rise-1">
              <span className="w-2 h-2 rounded-full bg-ifb-green shadow-[0_0_0_4px_#3fa86a20]" />
              Navegação AR · IFB Brasília
            </span>
            <h1 className="rise-2 text-[38px] lg:text-[58px] leading-[1.04] tracking-[-0.065em] font-extrabold text-ifb-text mt-5 mb-4 max-w-[560px]">
              Encontre qualquer lugar no <span className="text-ifb-green">campus IFB</span>
            </h1>
            <p className="rise-3 text-[17px] leading-[1.7] text-ifb-text-light max-w-[520px] mb-7">
              Escaneie o QR Code e receba direções em realidade aumentada com guia por voz —
              acessível para todos, incluindo pessoas com deficiência visual.
            </p>
            <div className="rise-4 flex flex-wrap gap-3">
              <Link to="/scanner" className="btn-primary">
                <Icon name="scan" size={18} strokeWidth={2} />
                Escanear QR Code
                <Icon name="arrowRight" size={16} strokeWidth={2} />
              </Link>
              <Link to="/acessibilidade" className="btn-outline">
                <Icon name="volume" size={18} strokeWidth={2} />
                Guia por Voz
              </Link>
            </div>
          </div>

          {/* Visual: foto do campus + QR Code central + cards flutuantes */}
          <div className="rise-frame relative h-[360px] lg:h-[434px] rounded-[30px] bg-ifb-green-light grid place-items-center overflow-hidden">
            <img
              src={CAMPUS_PHOTO}
              alt="Estudantes caminhando no campus do IFB Brasília"
              className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
            />
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-[#1639231c] to-transparent" />
            <div className="absolute inset-[14px] rounded-[23px] border border-white/60 pointer-events-none" />

            {/* Anel tracejado girando devagar */}
            <div className="orbit-ring absolute w-[296px] h-[296px] rounded-full border border-dashed border-white/80" />

            {/* Card central com QR Code */}
            <div className="relative z-10 w-36 h-[158px] rounded-[23px] bg-ifb-cream/95 backdrop-blur-md border border-white/85 shadow-[0_18px_42px_#143c2470] flex flex-col items-center justify-center gap-2.5">
              <div className="w-[68px] h-[68px] rounded-[19px] bg-ifb-green text-white grid place-items-center shadow-[0_7px_18px_#3fa86a4a]">
                <Icon name="qrCode" size={41} strokeWidth={2} />
              </div>
              <p className="text-xs text-ifb-text-light font-bold">QR Code</p>
            </div>

            {/* Foto da fachada do campus IFB Brasília */}
            <img
              src={CAMPUS_FACADE}
              alt="Fachada do campus do IFB Brasília"
              className="rise-frame absolute z-20 right-[18px] bottom-[18px] w-[178px] h-[126px] object-cover rounded-[17px] border-[3px] border-white shadow-[0_12px_30px_#15392340]"
            />

            {/* Cards flutuantes de locais */}
            {featured.map((loc, i) => (
              <div
                key={loc.id}
                className={`chip-float absolute ${cardPositions[i]} z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-[15px] bg-ifb-cream/95 backdrop-blur-md border border-white/85 shadow-[0_10px_28px_#15392328]`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="w-[34px] h-[34px] rounded-[11px] bg-ifb-green-light grid place-items-center text-[19px]">
                  {loc.icon}
                </span>
                <span>
                  <strong className="block text-xs leading-[1.3] whitespace-nowrap text-ifb-text">{loc.name}</strong>
                  <small className="block text-[11px] font-bold text-ifb-green mt-0.5">{loc.time}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <StepByStep />

      {/* ========== CTA FINAL ========== */}
      <section className="relative overflow-hidden bg-ifb-green text-white py-[57px] lg:py-[62px]">
        <div className="absolute w-[310px] h-[310px] rounded-full border border-white/15 -top-[195px] left-[5%] pointer-events-none" />
        <div className="absolute w-[390px] h-[390px] rounded-full border border-white/15 -bottom-[250px] right-[7%] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[28px] lg:text-[35px] leading-[1.1] tracking-[-0.05em] font-extrabold mb-3">
            Pronto para se localizar?
          </h2>
          <p className="text-[#e9f8ed] text-[15px] leading-[1.6] max-w-[460px] mx-auto mb-6">
            Comece agora a navegar pelo campus IFB com acessibilidade e tecnologia.
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2.5 bg-ifb-cream text-ifb-green font-bold text-sm px-5 py-3.5 rounded-[14px] shadow-[0_8px_18px_#154d2e2b] transition-colors duration-200 hover:bg-ifb-amber hover:text-[#173a22]"
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
