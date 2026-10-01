/**
 * ARNavigation.jsx — Página de navegação em Realidade Aumentada
 *
 * Funcionalidades:
 * 1. Câmera de fundo (getUserMedia) com overlay AR
 * 2. Seta direcional animada indicando o caminho
 * 3. HUD com metros restantes e tempo restante (contagem regressiva)
 * 4. Barra de progresso da rota
 * 5. Instruções de voz automáticas (Web Speech API)
 * 6. Botão "Ouvir novamente" para repetir a instrução atual
 * 7. Controle de velocidade da fala (0.5x a 2.0x)
 * 8. Tela de chegada ao destino
 *
 * @author IFB NavAR Team
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { locations, mapLocations } from '../data/locations.js'

const SIM_DURATION = 30 // duração da simulação em segundos

export default function ARNavigation() {
  const { locationId } = useParams()
  const navigate = useNavigate()

  // Busca em ambos os datasets
  const location =
    locations.find((l) => l.id === locationId) ||
    mapLocations.find((l) => l.id === locationId)

  const [navigating, setNavigating] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const timerRef = useRef(null)
  const speechRateRef = useRef(speechRate)

  useEffect(() => { speechRateRef.current = speechRate }, [speechRate])

  // Totais derivados do tempo do local
  const timeMin = location?.time ? parseInt(location.time) : 3
  const totalMeters = timeMin * 80 // ~80m por minuto de caminhada
  const totalSeconds = timeMin * 60
  const distanceRemaining = Math.round(totalMeters * (1 - progress / 100))
  const timeRemaining = Math.round(totalSeconds * (1 - progress / 100))

  const locLabel = location?.location || location?.sub || 'Campus IFB'

  const steps = location ? [
    { text: `Navegação iniciada para ${location.name}. Siga em frente pelo corredor principal.`, direction: 'forward', atPercent: 0 },
    { text: 'Continue em frente. Você está no caminho certo.', direction: 'forward', atPercent: 20 },
    { text: 'Atenção: vire à direita.', direction: 'right', atPercent: 45 },
    { text: `Continue em frente. Faltam aproximadamente ${Math.round(totalMeters * 0.3)} metros.`, direction: 'forward', atPercent: 70 },
    { text: `Você está chegando ao destino. ${location.name} está logo à frente.`, direction: 'forward', atPercent: 90 },
  ] : []

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'pt-BR'
    u.rate = speechRateRef.current
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(() => {})
      }
    } catch {
      setCameraError('Câmera não disponível. Navegação AR em modo simulado.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  const startNavigation = async () => {
    await startCamera()
    setNavigating(true)
    setArrived(false)
    setProgress(0)
    setCurrentStepIndex(0)
    speak(steps[0].text)
  }

  const stopNavigation = () => {
    setNavigating(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  // Timer de progresso
  useEffect(() => {
    if (!navigating) return
    timerRef.current = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 100 / SIM_DURATION))
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [navigating])

  // Detecção de mudança de passo + chegada
  useEffect(() => {
    if (!navigating) return
    let newStep = 0
    for (let i = steps.length - 1; i >= 0; i--) {
      if (progress >= steps[i].atPercent) { newStep = i; break }
    }
    if (newStep !== currentStepIndex) {
      setCurrentStepIndex(newStep)
      speak(steps[newStep].text)
    }
    if (progress >= 100) {
      setNavigating(false)
      setArrived(true)
      speak(`Você chegou ao seu destino: ${location.name}.`)
    }
  }, [progress, navigating]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera()
      if (timerRef.current) clearInterval(timerRef.current)
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  // ===== Render =====

  if (!location) {
    return (
      <div className="py-16 px-4 max-w-3xl mx-auto text-center">
        <p className="text-ifb-text-light mb-4">Local não encontrado.</p>
        <button onClick={() => navigate('/locais')} className="btn-primary">
          Ver locais disponíveis
        </button>
      </div>
    )
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const formatDistance = (m) => (m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`)

  const currentStep = steps[currentStepIndex] || steps[0]
  const arrowRotation = { forward: 0, right: 90, left: -90 }[currentStep?.direction] || 0
  const hasCamera = !!(videoRef.current?.srcObject)

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 overflow-hidden">
      {/* Câmera de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />
      {/* Fallback gradient se sem câmera */}
      {!hasCamera && (
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-gray-800/85 to-gray-900/95" />
      )}

      {/* Overlay AR */}
      <div className="relative h-full flex flex-col">
        {/* Barra superior */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
          <button
            onClick={() => { stopNavigation(); stopCamera(); navigate(-1) }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Fechar navegação"
          >
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
          <div className="text-center">
            <p className="text-white/60 text-xs">Navegando para</p>
            <p className="text-white font-semibold text-sm">{location.name}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* HUD — Distância e Tempo */}
        {navigating && (
          <div className="px-4 mt-2">
            <div className="flex gap-3">
              <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">Distância</p>
                <p className="text-white text-2xl font-bold tabular-nums">{formatDistance(distanceRemaining)}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">Tempo</p>
                <p className="text-white text-2xl font-bold tabular-nums">{formatTime(timeRemaining)}</p>
              </div>
            </div>
            {/* Barra de progresso */}
            <div className="mt-2 h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-ifb-green rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Centro — Seta AR */}
        <div className="flex-1 flex items-center justify-center">
          {navigating && !arrived ? (
            <div className="flex flex-col items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-ifb-green/20 animate-ping" />
                <div className="relative w-28 h-28 rounded-full bg-ifb-green/80 backdrop-blur-md flex items-center justify-center shadow-2xl border-2 border-white/30">
                  <div
                    className="transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${arrowRotation}deg)` }}
                  >
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <path d="M28 6 L46 44 L28 36 L10 44 Z" fill="white" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-white text-center text-sm font-medium max-w-xs px-6 leading-relaxed">
                {currentStep?.text}
              </p>
            </div>
          ) : arrived ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-ifb-green flex items-center justify-center shadow-2xl border-2 border-white/30">
                <Icon name="check" size={48} strokeWidth={2.5} className="text-white" />
              </div>
              <p className="text-white text-2xl font-bold">Você chegou!</p>
              <p className="text-white/70 text-sm">{location.name}</p>
              <p className="text-white/50 text-xs">{locLabel}</p>
            </div>
          ) : (
            /* Tela inicial — antes de navegar */
            <div className="flex flex-col items-center gap-5 px-8">
              <div className="w-20 h-20 rounded-2xl bg-ifb-green/80 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl border border-white/20">
                {location.icon}
              </div>
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-1">{location.name}</h2>
                <p className="text-white/60 text-sm">{locLabel}</p>
              </div>
              <div className="flex gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" size={16} strokeWidth={2} />
                  {location.time || '3 min'}
                </span>
                <span>·</span>
                <span>{formatDistance(totalMeters)}</span>
              </div>
              <button
                onClick={startNavigation}
                className="flex items-center gap-2 bg-ifb-green text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-ifb-green-dark transition-colors shadow-lg"
              >
                <Icon name="ar" size={20} strokeWidth={2} />
                Iniciar Navegação AR
              </button>
            </div>
          )}
        </div>

        {/* Controles inferiores */}
        {navigating && !arrived && (
          <div className="p-4 bg-gradient-to-t from-black/70 to-transparent space-y-3">
            {/* Botões de ação */}
            <div className="flex gap-3">
              <button
                onClick={() => speak(currentStep?.text || '')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md text-white text-sm font-medium transition-colors border border-white/10 ${
                  isSpeaking ? 'bg-ifb-green/40' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Icon name="volume" size={18} strokeWidth={2} />
                Ouvir novamente
              </button>
              <button
                onClick={stopNavigation}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/80 backdrop-blur-md text-white text-sm font-medium hover:bg-red-600 transition-colors border border-white/10"
              >
                <Icon name="close" size={18} strokeWidth={2} />
                Parar
              </button>
            </div>
            {/* Controle de velocidade da fala */}
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
              <Icon name="gauge" size={18} strokeWidth={2} className="text-white/70 shrink-0" />
              <span className="text-white/70 text-xs font-medium shrink-0">Velocidade da voz</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="flex-1 accent-ifb-green"
                aria-label="Velocidade da fala"
              />
              <span className="text-white text-sm font-bold w-10 text-right tabular-nums">{speechRate.toFixed(1)}x</span>
            </div>
          </div>
        )}

        {/* Botão de chegada */}
        {arrived && (
          <div className="p-4">
            <button
              onClick={() => { stopCamera(); navigate('/locais') }}
              className="w-full flex items-center justify-center gap-2 bg-ifb-green text-white font-semibold py-3.5 rounded-xl hover:bg-ifb-green-dark transition-colors shadow-lg"
            >
              <Icon name="check" size={18} strokeWidth={2.5} />
              Concluir navegação
            </button>
          </div>
        )}

        {/* Aviso de câmera */}
        {cameraError && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-yellow-500/90 text-white text-xs px-4 py-2 rounded-lg backdrop-blur-md whitespace-nowrap">
            {cameraError}
          </div>
        )}
      </div>
    </div>
  )
}
