import { useState, useRef, useEffect } from 'react'
import BackButton from '../components/BackButton.jsx'
import { locations } from '../data/locations.js'

export default function Accessibility() {
  const [activeTab, setActiveTab] = useState('config')
  const [settings, setSettings] = useState({
    voiceGuide: false,
    highContrast: false,
    largeText: false,
    reduceAnimations: false,
    colorBlindness: 'Nenhum',
    screenReader: false,
  })
  const [listening, setListening] = useState(false)
  const [voiceResult, setVoiceResult] = useState(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('ifb-accessibility')
    if (saved) setSettings(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('ifb-accessibility', JSON.stringify(settings))
    const body = document.body
    body.classList.toggle('high-contrast', settings.highContrast)
    body.classList.toggle('large-text', settings.largeText)
    body.classList.toggle('reduce-animations', settings.reduceAnimations)
  }, [settings])

  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta síntese de voz.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de voz.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      const found = locations.find(
        (l) =>
          l.name.toLowerCase().includes(transcript) ||
          transcript.includes(l.name.toLowerCase())
      )
      if (found) {
        setVoiceResult(found)
        speak(`Indo para ${found.name}. Tempo estimado: ${found.time}. Localização: ${found.location}.`)
      } else {
        setVoiceResult({ name: 'Não encontrado', description: `Você disse: "${transcript}"` })
      }
    }
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop()
    setListening(false)
  }

  const toggles = [
    { key: 'voiceGuide', icon: '🔊', title: 'Guia por Voz', desc: 'Lê as instruções de navegação em voz alta em português' },
    { key: 'highContrast', icon: '🌓', title: 'Alto Contraste', desc: 'Aumenta o contraste para melhor legibilidade (deficiência visual)' },
    { key: 'largeText', icon: '🔍', title: 'Texto Grande', desc: 'Aumenta o tamanho das letras em toda a aplicação' },
    { key: 'reduceAnimations', icon: '✨', title: 'Reduzir Animações', desc: 'Remove animações para pessoas com sensibilidade a movimento' },
    { key: 'screenReader', icon: '🗣️', title: 'Leitor de Tela', desc: 'Otimiza a navegação para leitores de tela (VoiceOver, TalkBack)' },
  ]

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-ifb-text mb-1">Acessibilidade</h1>
      <p className="text-ifb-text-light mb-6">Ajuste o app às suas necessidades</p>

      {/* Preference cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-ifb-border p-4 text-center">
          <span className="text-2xl block mb-1">🌓</span>
          <p className="text-xs font-medium text-ifb-text">Alto Contraste</p>
          <p className="text-[10px] text-ifb-green bg-ifb-green-light inline-block px-2 py-0.5 rounded-full mt-1">
            {settings.highContrast ? 'Ativado' : 'Desativado'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-ifb-border p-4 text-center">
          <span className="text-2xl block mb-1">🎧</span>
          <p className="text-xs font-medium text-ifb-text">Leitor de Tela</p>
          <p className="text-[10px] text-ifb-green bg-ifb-green-light inline-block px-2 py-0.5 rounded-full mt-1">
            {settings.screenReader ? 'Ativado' : 'Desativado'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-ifb-border p-4 text-center">
          <span className="text-2xl block mb-1">🤟</span>
          <p className="text-xs font-medium text-ifb-text">VLibras</p>
          <p className="text-[10px] text-ifb-green bg-ifb-green-light inline-block px-2 py-0.5 rounded-full mt-1">
            Libras
          </p>
        </div>
      </div>

      {/* Info alert */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-ifb-green-light border border-ifb-green mb-6">
        <span className="text-ifb-green text-lg">ℹ️</span>
        <p className="text-sm text-ifb-text">
          Todas as configurações são salvas automaticamente no seu dispositivo e aplicadas em todo o app.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'config' ? 'bg-white text-ifb-text shadow-sm' : 'text-ifb-text-light'
          }`}
        >
          Configurações
        </button>
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'voice' ? 'bg-white text-ifb-text shadow-sm' : 'text-ifb-text-light'
          }`}
        >
          Comando de Voz
        </button>
        <button
          onClick={() => setActiveTab('libras')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'libras' ? 'bg-white text-ifb-text shadow-sm' : 'text-ifb-text-light'
          }`}
        >
          🤟 Libras
        </button>
      </div>

      {/* Config tab */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-2xl border border-ifb-border p-2">
          {toggles.map((t) => (
            <div key={t.key} className="flex items-center gap-3 p-4 border-b border-ifb-border last:border-0">
              <span className="text-2xl">{t.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-ifb-text">{t.title}</p>
                <p className="text-sm text-ifb-text-light">{t.desc}</p>
              </div>
              <button
                onClick={() => toggle(t.key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[t.key] ? 'bg-ifb-green' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings[t.key] ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          ))}

          {/* Daltonismo dropdown */}
          <div className="flex items-center gap-3 p-4">
            <span className="text-2xl">🎨</span>
            <div className="flex-1">
              <p className="font-medium text-ifb-text">Daltonismo</p>
              <p className="text-sm text-ifb-text-light">Ajusta as cores para diferentes tipos de daltonismo</p>
            </div>
            <select
              value={settings.colorBlindness}
              onChange={(e) => setSettings((s) => ({ ...s, colorBlindness: e.target.value }))}
              className="px-3 py-1.5 rounded-lg border border-ifb-border bg-white text-sm text-ifb-text focus:outline-none focus:ring-2 focus:ring-ifb-green"
            >
              <option>Nenhum</option>
              <option>Protanopia</option>
              <option>Deuteranopia</option>
              <option>Tritanopia</option>
            </select>
          </div>
        </div>
      )}

      {/* Voice command tab */}
      {activeTab === 'voice' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-ifb-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl">
                🎤
              </div>
              <div>
                <h2 className="font-semibold text-ifb-text">Comando de Voz</h2>
                <p className="text-sm text-ifb-text-light">Diga o nome do local e ouça como chegar</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!listening ? (
                <button onClick={startListening} className="btn-primary flex-1 justify-center">
                  🎤 Falar destino
                </button>
              ) : (
                <button onClick={stopListening} className="btn-outline flex-1 justify-center animate-pulse">
                  🛑 Ouvindo... (toque para parar)
                </button>
              )}
            </div>
            {voiceResult && (
              <div className="mt-4 p-4 rounded-xl bg-ifb-green-light">
                <p className="font-medium text-ifb-text">
                  {voiceResult.icon} {voiceResult.name}
                </p>
                {voiceResult.time && (
                  <p className="text-sm text-ifb-text-light mt-1">
                    ⏱️ {voiceResult.time} · 📍 {voiceResult.location}
                  </p>
                )}
                {voiceResult.description && (
                  <p className="text-sm text-ifb-text-light mt-1">{voiceResult.description}</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-ifb-border p-6">
            <h2 className="font-semibold text-ifb-text mb-2">🔊 Guia por Voz</h2>
            <p className="text-sm text-ifb-text-light mb-4">
              Toque em um local para ouvir as direções em áudio:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => speak(`${loc.name}. Tempo estimado: ${loc.time}. Localização: ${loc.location}.`)}
                  className="flex items-center gap-2 p-3 rounded-xl border border-ifb-border hover:bg-ifb-green-light transition-colors text-left"
                >
                  <span className="text-lg">{loc.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-ifb-text">{loc.name}</p>
                    <p className="text-xs text-ifb-green">{loc.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Libras tab */}
      {activeTab === 'libras' && (
        <div className="bg-white rounded-2xl border border-ifb-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl">
              🤟
            </div>
            <div>
              <h2 className="font-semibold text-ifb-text">VLibras — Libras</h2>
              <p className="text-sm text-ifb-text-light">Tradução automática para Língua Brasileira de Sinais</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-ifb-green-light mb-4">
            <p className="text-sm text-ifb-text">
              O widget do VLibras está ativo no canto direito da tela. Clique no ícone azul 🤟 para abrir o tradutor de Libras e traduzir qualquer texto do app para língua de sinais.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <span className="text-2xl">🤟</span>
              <div>
                <p className="font-medium text-sm text-ifb-text">Widget VLibras ativo</p>
                <p className="text-xs text-ifb-text-light">Disponível em todas as páginas do app</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <span className="text-2xl">📖</span>
              <div>
                <p className="font-medium text-sm text-ifb-text">Como usar</p>
                <p className="text-xs text-ifb-text-light">Clique no ícone azul, selecione o texto e veja a tradução em Libras</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <span className="text-2xl">♿</span>
              <div>
                <p className="font-medium text-sm text-ifb-text">Acessibilidade total</p>
                <p className="text-xs text-ifb-text-light">Conteúdo acessível para pessoas surdas</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
