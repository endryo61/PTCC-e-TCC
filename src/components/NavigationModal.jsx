/**
 * NavigationModal.jsx — Modal de escolha de modo de navegação
 *
 * Exibe opções quando o usuário seleciona um local:
 * - Realidade Aumentada (AR)
 * - Navegação Normal (mapa)
 * - Guia por Voz (toggle on/off)
 *
 * @author IFB NavAR Team
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function NavigationModal({ location, onClose }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('ar')
  const [voiceGuide, setVoiceGuide] = useState(false)

  if (!location) return null

  const subtitle = location.location || location.sub || ''

  const handleStart = () => {
    const prefs = { mode, voiceGuide, destination: location.id, destinationName: location.name }
    localStorage.setItem('ifb-navigation', JSON.stringify(prefs))
    navigate('/navegacao')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Opções de navegação para ${location.name}`}
    >
      <div
        className="bg-white rounded-t-lg sm:rounded-lg w-full max-w-md shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-ifb-border">
          <div className="w-12 h-12 rounded-lg bg-ifb-green-light flex items-center justify-center text-2xl shrink-0">
            {location.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-ifb-text tracking-tight">{location.name}</h2>
            <div className="flex items-center gap-3 text-xs text-ifb-text-light mt-0.5">
              {location.time && (
                <span className="flex items-center gap-1 font-semibold text-ifb-green">
                  <Icon name="clock" size={12} strokeWidth={2} />
                  {location.time}
                </span>
              )}
              {location.distance && (
                <span className="flex items-center gap-1">
                  <Icon name="route" size={12} strokeWidth={2} />
                  {location.distance}
                </span>
              )}
              {subtitle && <span className="truncate">{subtitle}</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ifb-text-light hover:text-ifb-text p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            aria-label="Fechar"
          >
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm font-semibold text-ifb-text mb-3">Como deseja navegar?</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setMode('ar')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
                mode === 'ar'
                  ? 'border-ifb-green bg-ifb-green-light'
                  : 'border-ifb-border bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                mode === 'ar' ? 'bg-ifb-green text-white' : 'bg-ifb-green-light text-ifb-green'
              }`}>
                <Icon name="ar" size={22} strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${mode === 'ar' ? 'text-ifb-green' : 'text-ifb-text'}`}>Realidade Aumentada</p>
                <p className="text-xs mt-0.5 text-ifb-text-light">Setas AR no mundo real</p>
              </div>
            </button>
            <button
              onClick={() => setMode('normal')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
                mode === 'normal'
                  ? 'border-ifb-green bg-ifb-green-light'
                  : 'border-ifb-border bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                mode === 'normal' ? 'bg-ifb-green text-white' : 'bg-ifb-green-light text-ifb-green'
              }`}>
                <Icon name="route" size={22} strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${mode === 'normal' ? 'text-ifb-green' : 'text-ifb-text'}`}>Navegação Normal</p>
                <p className="text-xs mt-0.5 text-ifb-text-light">Mapa com direções</p>
              </div>
            </button>
          </div>

          {/* Voice guide toggle */}
          <button
            onClick={() => setVoiceGuide(!voiceGuide)}
            className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
              voiceGuide
                ? 'border-ifb-green bg-ifb-green-light'
                : 'border-ifb-border bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              voiceGuide ? 'bg-ifb-green text-white' : 'bg-ifb-green-light text-ifb-green'
            }`}>
              <Icon name="volume" size={20} strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-ifb-text">Guia por Voz</p>
              <p className="text-xs text-ifb-text-light">Ouvir as instruções em áudio</p>
            </div>
            <span className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
              voiceGuide ? 'bg-ifb-green' : 'bg-gray-300'
            }`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                voiceGuide ? 'translate-x-5' : ''
              }`} />
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-5 pt-0">
          <button
            onClick={handleStart}
            className="btn-primary w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
          >
            <Icon name="route" size={18} strokeWidth={2} />
            Iniciar Navegação
          </button>
        </div>
      </div>
    </div>
  )
}
