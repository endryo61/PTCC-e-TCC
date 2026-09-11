/**
 * Accessibility.jsx — Página de configurações de acessibilidade
 *
 * Estrutura:
 * 1. Cards de preferência rápida (Alto Contraste, Leitor de Tela, VLibras)
 * 2. Banner informativo
 * 3. Abas: Configurações | Comando de Voz | Libras
 *
 * Funcionalidades:
 * - Toggles persistidos em localStorage (chave: 'ifb-accessibility')
 * - Alto Contraste, Texto Grande e Reduzir Animações aplicam classes CSS no <body>
 * - Comando de Voz usa Web Speech API (reconhecimento + síntese)
 * - Aba Libras explica como usar o widget VLibras
 *
 * Para adicionar uma nova configuração:
 * 1. Adicione a chave em `settings` (estado inicial)
 * 2. Adicione uma entrada em `toggles` (se for um toggle)
 * 3. Se precisar de efeito visual, adicione a classe CSS em index.css
 *
 * @author IFB NavAR Team
 */
import { useState, useRef, useEffect } from 'react'
import Icon from '../components/Icon.jsx'
import BackButton from '../components/BackButton.jsx'
import { locations } from '../data/locations.js'

export default function Accessibility() {
  const [activeTab, setActiveTab] = useState('config')

  // Estado das configurações — persistido em localStorage
  const [settings, setSettings] = useState({
    voiceGuide: false,
    highContrast: false,
    largeText: false,
    reduceAnimations: false,
    colorBlindness: 'Nenhum',
    screenReader: false,
  })

  // Estado do comando de voz
  const [listening, setListening] = useState(false)
  const [voiceResult, setVoiceResult] = useState(null)
  const recognitionRef = useRef(null)

  // Carrega configurações salvas ao montar
  useEffect(() => {
    const saved = localStorage.getItem('ifb-accessibility')
    if (saved) setSettings(JSON.parse(saved))
  }, [])

  // Salva configurações e aplica efeitos visuais no body
  useEffect(() => {
    localStorage.setItem('ifb-accessibility', JSON.stringify(settings))
    document.body.classList.toggle('high-contrast', settings.highContrast)
    document.body.classList.toggle('large-text', settings.largeText)
    document.body.classList.toggle('reduce-animations', settings.reduceAnimations)
  }, [settings])

  // Alterna uma configuração booleana
  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  // Síntese de voz — lê o texto em português
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

  // Inicia o reconhecimento de voz (Web Speech API)
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
      // Busca local pelo nome falado
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

  // Lista de toggles de configuração
  const toggles = [
    { key: 'voiceGuide', icon: 'volume', title: 'Guia por Voz', desc: 'Lê as instruções de navegação em voz alta em português' },
    { key: 'highContrast', icon: 'contrast', title: 'Alto Contraste', desc: 'Aumenta o contraste para melhor legibilidade (deficiência visual)' },
    { key: 'largeText', icon: 'textSize', title: 'Texto Grande', desc: 'Aumenta o tamanho das letras em toda a aplicação' },
    { key: 'reduceAnimations', icon: 'sparkles', title: 'Reduzir Animações', desc: 'Remove animações para pessoas com sensibilidade a movimento' },
    { key: 'screenReader', icon: 'headphones', title: 'Leitor de Tela', desc: 'Otimiza a navegação para leitores de tela (VoiceOver, TalkBack)' },
  ]

  // Cards de preferência rápida (topo da página)
  const preferenceCards = [
    { key: 'highContrast', icon: 'contrast', label: 'Alto Contraste' },
    { key: 'screenReader', icon: 'headphones', label: 'Leitor de Tela' },
    { key: 'vlibras', icon: 'signLanguage', label: 'VLibras', status: 'Libras' },
  ]

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-ifb-text mb-1">Acessibilidade</h1>
      <p className="text-ifb-text-light mb-6">Ajuste o app às suas necessidades</p>

      {/* Cards de preferência rápida */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {preferenceCards.map((card) => (
          <div key={card.key} className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green mb-2">
              <Icon name={card.icon} size={20} strokeWidth={1.8} />
            </div>
            <p className="text-xs font-medium text-ifb-text">{card.label}</p>
            <p className="text-[10px] text-ifb-green bg-ifb-green-light inline-block px-2 py-0.5 rounded-full mt-1">
              {card.status || (settings[card.key] ? 'Ativado' : 'Desativado')}
            </p>
          </div>
        ))}
      </div>

      {/* Banner informativo */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-ifb-green-light border border-ifb-green/30 mb-6">
        <span className="text-ifb-green mt-0.5">
          <Icon name="info" size={18} strokeWidth={2} />
        </span>
        <p className="text-sm text-ifb-text leading-relaxed">
          Todas as configurações são salvas automaticamente no seu dispositivo e aplicadas em todo o app.
        </p>
      </div>

      {/* Abas */}
      <div className="flex gap-1 mb-6 bg-gray-100/80 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'config' ? 'bg-white text-ifb-text shadow-soft' : 'text-ifb-text-light hover:text-ifb-text'
          }`}
        >
          Configurações
        </button>
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'voice' ? 'bg-white text-ifb-text shadow-soft' : 'text-ifb-text-light hover:text-ifb-text'
          }`}
        >
          Comando de Voz
        </button>
        <button
          onClick={() => setActiveTab('libras')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'libras' ? 'bg-white text-ifb-text shadow-soft' : 'text-ifb-text-light hover:text-ifb-text'
          }`}
        >
          Libras
        </button>
      </div>

      {/* ===== ABA: Configurações ===== */}
      {activeTab === 'config' && (
        <div className="card p-2">
          {toggles.map((t) => (
            <div key={t.key} className="flex items-center gap-3 p-4 border-b border-ifb-border last:border-0">
              <div className="w-10 h-10 rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green shrink-0">
                <Icon name={t.icon} size={20} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ifb-text text-sm">{t.title}</p>
                <p className="text-xs text-ifb-text-light mt-0.5">{t.desc}</p>
              </div>
              {/* Toggle switch */}
              <button
                onClick={() => toggle(t.key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  settings[t.key] ? 'bg-ifb-green' : 'bg-gray-300'
                }`}
                aria-label={t.title}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings[t.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          ))}

          {/* Daltonismo — dropdown em vez de toggle */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green shrink-0">
              <Icon name="palette" size={20} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ifb-text text-sm">Daltonismo</p>
              <p className="text-xs text-ifb-text-light mt-0.5">Ajusta as cores para diferentes tipos de daltonismo</p>
            </div>
            <select
              value={settings.colorBlindness}
              onChange={(e) => setSettings((s) => ({ ...s, colorBlindness: e.target.value }))}
              className="px-3 py-1.5 rounded-lg border border-ifb-border bg-white text-sm text-ifb-text focus:outline-none focus:ring-2 focus:ring-ifb-green/30 focus:border-ifb-green transition-all shrink-0"
            >
              <option>Nenhum</option>
              <option>Protanopia</option>
              <option>Deuteranopia</option>
              <option>Tritanopia</option>
            </select>
          </div>
        </div>
      )}

      {/* ===== ABA: Comando de Voz ===== */}
      {activeTab === 'voice' && (
        <div className="space-y-6">
          {/* Card de comando de voz */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green">
                <Icon name="mic" size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="font-semibold text-ifb-text">Comando de Voz</h2>
                <p className="text-sm text-ifb-text-light">Diga o nome do local e ouça como chegar</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!listening ? (
                <button onClick={startListening} className="btn-primary flex-1 justify-center">
                  <Icon name="mic" size={18} strokeWidth={2} />
                  Falar destino
                </button>
              ) : (
                <button onClick={stopListening} className="btn-outline flex-1 justify-center animate-pulse">
                  Ouvindo... (toque para parar)
                </button>
              )}
            </div>
            {voiceResult && (
              <div className="mt-4 p-4 rounded-xl bg-ifb-green-light border border-ifb-green/20">
                <p className="font-medium text-ifb-text flex items-center gap-2">
                  {voiceResult.icon && <span>{voiceResult.icon}</span>}
                  {voiceResult.name}
                </p>
                {voiceResult.time && (
                  <p className="text-sm text-ifb-text-light mt-1">
                    {voiceResult.time} · {voiceResult.location}
                  </p>
                )}
                {voiceResult.description && (
                  <p className="text-sm text-ifb-text-light mt-1">{voiceResult.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Guia por voz — lista de locais para ouvir */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="volume" size={18} strokeWidth={2} className="text-ifb-green" />
              <h2 className="font-semibold text-ifb-text">Guia por Voz</h2>
            </div>
            <p className="text-sm text-ifb-text-light mb-4">
              Toque em um local para ouvir as direções em áudio:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => speak(`${loc.name}. Tempo estimado: ${loc.time}. Localização: ${loc.location}.`)}
                  className="flex items-center gap-2 p-3 rounded-xl border border-ifb-border hover:bg-ifb-green-light hover:border-ifb-green/30 transition-all text-left"
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

      {/* ===== ABA: Libras ===== */}
      {activeTab === 'libras' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green">
              <Icon name="signLanguage" size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-semibold text-ifb-text">VLibras — Libras</h2>
              <p className="text-sm text-ifb-text-light">Tradução automática para Língua Brasileira de Sinais</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-ifb-green-light border border-ifb-green/20 mb-4">
            <p className="text-sm text-ifb-text leading-relaxed">
              O widget do VLibras está ativo no canto direito da tela. Clique no ícone azul para abrir o tradutor de Libras e traduzir qualquer texto do app para língua de sinais.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <div className="w-9 h-9 rounded-lg bg-ifb-green-light flex items-center justify-center text-ifb-green shrink-0">
                <Icon name="signLanguage" size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="font-medium text-sm text-ifb-text">Widget VLibras ativo</p>
                <p className="text-xs text-ifb-text-light">Disponível em todas as páginas do app</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <div className="w-9 h-9 rounded-lg bg-ifb-green-light flex items-center justify-center text-ifb-green shrink-0">
                <Icon name="book" size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="font-medium text-sm text-ifb-text">Como usar</p>
                <p className="text-xs text-ifb-text-light">Clique no ícone azul, selecione o texto e veja a tradução em Libras</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border">
              <div className="w-9 h-9 rounded-lg bg-ifb-green-light flex items-center justify-center text-ifb-green shrink-0">
                <Icon name="accessibility" size={18} strokeWidth={2} />
              </div>
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
