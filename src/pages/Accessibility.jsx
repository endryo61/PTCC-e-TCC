import { useState, useRef } from 'react'
import { locations } from '../data/locations.js'

export default function Accessibility() {
  const [speaking, setSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceResult, setVoiceResult] = useState(null)
  const recognitionRef = useRef(null)

  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta síntese de voz.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.95
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
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
        speak(`Indo para ${found.name}. Tempo estimado: ${found.time}. Distância: ${found.distance}.`)
      } else {
        setVoiceResult({ name: 'Não encontrado', description: `Você disse: "${transcript}"` })
      }
    }
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setListening(false)
  }

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-ifb-text mb-2">Acessibilidade</h1>
      <p className="text-ifb-text-light mb-8">
        Recursos de voz e rotas acessíveis para todos os usuários.
      </p>

      {/* Guia por Voz */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl">
            🔊
          </div>
          <div>
            <h2 className="font-semibold text-ifb-text">Guia por Voz</h2>
            <p className="text-sm text-ifb-text-light">Ouça as instruções de navegação em português</p>
          </div>
        </div>
        <p className="text-sm text-ifb-text-light mb-4">
          Toque em um local para ouvir as direções em áudio:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {locations.slice(0, 6).map((loc) => (
            <button
              key={loc.id}
              onClick={() => speak(`${loc.name}. Tempo estimado: ${loc.time}. Distância: ${loc.distance}. Localização: ${loc.floor}.`)}
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
        {speaking && (
          <button onClick={stopSpeaking} className="btn-outline w-full justify-center">
            ⏹️ Parar áudio
          </button>
        )}
      </div>

      {/* Comando de Voz */}
      <div className="card p-6 mb-6">
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
                ⏱️ {voiceResult.time} · 📏 {voiceResult.distance} · 📍 {voiceResult.floor}
              </p>
            )}
            {voiceResult.description && (
              <p className="text-sm text-ifb-text-light mt-1">{voiceResult.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Rotas Acessíveis */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl">
            ♿
          </div>
          <div>
            <h2 className="font-semibold text-ifb-text">Rotas Acessíveis</h2>
            <p className="text-sm text-ifb-text-light">Caminhos com rampas, elevadores e acesso facilitado</p>
          </div>
        </div>
        <div className="grid gap-3">
          {locations.map((loc) => (
            <div key={loc.id} className="flex items-start gap-3 p-3 rounded-xl border border-ifb-border">
              <span className="text-xl">{loc.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-sm text-ifb-text">{loc.name}</p>
                <p className="text-xs text-ifb-text-light mb-2">{loc.floor}</p>
                <div className="flex flex-wrap gap-1.5">
                  {loc.features.map((f) => (
                    <span key={f} className="text-xs bg-ifb-green-light text-ifb-green px-2 py-0.5 rounded-full">
                      ♿ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
