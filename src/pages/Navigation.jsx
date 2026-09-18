/**
 * Navigation.jsx — Página de navegação ativa (AR ou Normal)
 *
 * Lê as preferências salvas pelo NavigationModal em localStorage
 * e exibe a interface de navegação com:
 * - Informações de tempo e distância
 * - Visual AR (setas sobrepostas) ou mapa normal
 * - Passo a passo da rota
 * - Guia por voz (Web Speech API) se ativado
 *
 * @author IFB NavAR Team
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { locations, mapLocations } from '../data/locations.js'
import { formatDuration, formatDistance } from '../services/osrm.js'

// Gera passos da rota: usa dados reais do OSRM se disponíveis, senão fallback
function generateSteps(loc, routeData) {
  if (routeData?.steps?.length) {
    return routeData.steps.map((s) => ({
      instruction: s.instruction,
      distance: formatDistance(s.distance),
    }))
  }

  // Fallback — passos genéricos baseados na localização
  const parts = (loc.location || loc.sub || '').split('·').map((s) => s.trim())
  const block = parts[0] || 'o bloco'
  const floor = parts[1] || 'o térreo'

  return [
    { instruction: 'Saia da entrada principal do campus', distance: '0 m' },
    { instruction: `Vá em direção ao ${block}`, distance: '50 m' },
    { instruction: `Entre no ${block}`, distance: '100 m' },
    { instruction: `Procure no ${floor}`, distance: loc.distance || '150 m' },
    { instruction: 'Você chegou ao seu destino!', distance: loc.distance || '150 m' },
  ]
}

// Busca local por id em ambas as listas
function findLocation(id) {
  return locations.find((l) => l.id === id) || mapLocations.find((l) => l.id === id)
}

export default function Navigation() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState(null)
  const [destination, setDestination] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const spokenRef = useRef(false)

  // Carrega preferências e destino ao montar
  useEffect(() => {
    const stored = localStorage.getItem('ifb-navigation')
    if (stored) {
      const p = JSON.parse(stored)
      // Sincroniza com configurações de acessibilidade
      const a11y = localStorage.getItem('ifb-accessibility')
      if (a11y) {
        const a = JSON.parse(a11y)
        if (a.voiceGuide) p.voiceGuide = true
      }
      setPrefs(p)
      const dest = findLocation(p.destination)
      if (dest) setDestination(dest)
    }
  }, [])

  // Gera os passos da rota — usa dados reais do OSRM se disponíveis
  const routeData = prefs?.routeData
  const realTime = routeData ? formatDuration(routeData.duration) : null
  const realDistance = routeData ? formatDistance(routeData.distance) : null
  const steps = destination ? generateSteps(destination, routeData) : []

  // Síntese de voz — lê as instruções
  const speak = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.95
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  // Fala a introdução + primeiro passo ao carregar (se voz ativada)
  useEffect(() => {
    if (destination && prefs?.voiceGuide && !spokenRef.current) {
      spokenRef.current = true
      const intro = `Navegação iniciada para ${destination.name}. Tempo estimado: ${realTime || destination.time || ''}. Distância: ${realDistance || destination.distance || ''}. ${steps[0]?.instruction || ''}`
      speak(intro)
    }
  }, [destination, prefs])

  // Lê a rota completa em voz alta
  const speakFullRoute = () => {
    if (!destination || !steps.length) return
    const text = `Rota para ${destination.name}. Tempo estimado: ${realTime || destination.time || ''}. Distância: ${realDistance || destination.distance || ''}. ` +
      steps.map((s, i) => `Passo ${i + 1}: ${s.instruction}.`).join(' ')
    speak(text)
  }

  // Fala o passo atual
  const speakStep = (index) => {
    if (!steps[index]) return
    speak(steps[index].instruction)
  }

  // Para a navegação
  const handleStop = () => {
    window.speechSynthesis?.cancel()
    navigate(-1)
  }

  // Avança para o próximo passo
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      if (prefs?.voiceGuide) speakStep(next)
    }
  }

  if (!destination) {
    return (
      <div className="py-8 px-4 max-w-3xl mx-auto text-center">
        <p className="text-ifb-text-light mb-4">Nenhuma navegação ativa.</p>
        <button onClick={() => navigate('/locais')} className="btn-primary">
          <Icon name="pin" size={18} strokeWidth={2} />
          Escolher um local
        </button>
      </div>
    )
  }

  const isAR = prefs?.mode === 'ar'
  const isVoiceEnabled = prefs?.voiceGuide

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho da navegação */}
      <div className="bg-white border-b border-ifb-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={handleStop}
          className="flex items-center gap-1.5 text-ifb-text-light hover:text-ifb-text font-medium text-sm min-h-[44px] px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
        >
          <Icon name="arrowLeft" size={18} strokeWidth={2} />
          Sair
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ifb-text truncate">{destination.name}</p>
          <p className="text-xs text-ifb-text-light">
            {(realTime || destination.time) && `${realTime || destination.time} · `}
            {(realDistance || destination.distance) && `${realDistance || destination.distance} · `}
            {destination.location || destination.sub || ''}
          </p>
        </div>
        {isAR && (
          <span className="flex items-center gap-1 bg-ifb-green text-white text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
            <Icon name="ar" size={12} strokeWidth={2.5} />
            AR
          </span>
        )}
        <button
          onClick={() => speakStep(currentStep)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 ${
            isSpeaking ? 'bg-ifb-green text-white animate-pulse' : 'bg-ifb-green-light text-ifb-green'
          }`}
          aria-label="Ouvir instrução"
        >
          <Icon name="volume" size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Área de visualização da navegação */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: '320px' }}>
        {isAR ? (
          /* Visual AR — fundo escuro simulando câmera com setas */
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
            {/* Seta AR grande */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-ifb-green/20 flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-ifb-green/30 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Indicação de direção */}
            <p className="text-white text-lg font-bold mb-1">{steps[currentStep]?.instruction}</p>
            <p className="text-white/60 text-sm">
              {currentStep < steps.length - 1 ? `Próximo: ${steps[currentStep + 1]?.instruction}` : 'Destino final'}
            </p>
            {/* Distância restante */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white/80 text-xs">Distância restante</p>
              <p className="text-white text-xl font-bold">{steps[currentStep]?.distance}</p>
            </div>
            {/* Badge AR no canto */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-ifb-green text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              AR ATIVO
            </div>
          </div>
        ) : (
          /* Visual Normal — mapa simplificado com rota */
          <div className="absolute inset-0 bg-ifb-gray flex flex-col items-center justify-center p-6">
            {/* Mapa simplificado */}
            <div className="w-full max-w-sm bg-white rounded-lg border border-ifb-border p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-ifb-green flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="flex-1 h-0.5 bg-ifb-green/30 relative">
                    <div className="absolute inset-0 border-t-2 border-dashed border-ifb-green" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-ifb-green-light flex items-center justify-center text-ifb-green text-xs font-bold">
                    B
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-ifb-text mb-1">{steps[currentStep]?.instruction}</p>
              <p className="text-xs text-ifb-text-light mb-4">
                {currentStep < steps.length - 1 ? `Próximo: ${steps[currentStep + 1]?.instruction}` : 'Destino final'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-ifb-green">
                  <Icon name="clock" size={14} strokeWidth={2} />
                  {realTime || destination.time || '—'}
                </span>
                <span className="flex items-center gap-1.5 text-ifb-text-light">
                  <Icon name="route" size={14} strokeWidth={2} />
                  {steps[currentStep]?.distance}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Passo a passo */}
      <div className="bg-white border-t border-ifb-border px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-ifb-text-light uppercase tracking-wider font-medium">
            Passo {currentStep + 1} de {steps.length}
          </p>
          <button
            onClick={speakFullRoute}
            className="flex items-center gap-1.5 text-xs font-medium text-ifb-green hover:text-ifb-green-dark transition-colors min-h-[36px] px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
          >
            <Icon name="volume" size={14} strokeWidth={2} />
            Ouvir rota completa
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i <= currentStep ? 'bg-ifb-green' : 'bg-ifb-border'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-outline flex-1 justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            >
              <Icon name="arrowLeft" size={16} strokeWidth={2} />
              Voltar
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="btn-primary flex-1 justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            >
              Próximo passo
              <Icon name="arrowRight" size={16} strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="btn-primary flex-1 justify-center bg-ifb-green focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
            >
              <Icon name="check" size={18} strokeWidth={2} />
              Concluir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
