import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import { locations } from '../data/locations.js'

export default function Scanner() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [simulated, setSimulated] = useState(null)
  const scannerRef = useRef(null)
  const containerId = 'qr-reader'

  const startScanner = async () => {
    setError(null)
    setResult(null)
    try {
      const scanner = new Html5Qrcode(containerId)
      scannerRef.current = scanner
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setResult(decodedText)
          setScanning(false)
          scanner.stop().catch(() => {})
        },
        () => {}
      )
      setScanning(true)
    } catch (err) {
      setError('Não foi possível acessar a câmera. Verifique as permissões do navegador.')
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
      } catch {}
    }
    setScanning(false)
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  const simulateLocations = locations.slice(0, 4)

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-ifb-text mb-1">Scanner QR Code</h1>
      <p className="text-ifb-text-light mb-6">Aponte para o código no campus</p>

      {/* Scanner card */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-ifb-border p-8 mb-6">
        <div id={containerId} className="w-full min-h-[200px] rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
          {!scanning && !result && (
            <div className="text-center text-white/60 py-12">
              <span className="text-5xl block mb-3">📱</span>
              <p className="text-sm">Pronto para escanear</p>
              <p className="text-xs mt-1">Aponte sua câmera para o QR Code no campus do IFB</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {!scanning ? (
            <button onClick={startScanner} className="btn-primary flex-1 justify-center">
              📷 Abrir Câmera
            </button>
          ) : (
            <button onClick={stopScanner} className="btn-outline flex-1 justify-center">
              ⏹️ Parar Câmera
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl border border-ifb-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-ifb-green-light flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <h2 className="font-semibold text-ifb-text">QR Code detectado!</h2>
              <p className="text-sm text-ifb-text-light">Conteúdo: {result}</p>
            </div>
          </div>
          <p className="text-sm text-ifb-text mb-4">Selecione para onde deseja ir:</p>
          <div className="grid grid-cols-2 gap-2">
            {simulateLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => navigate('/locais')}
                className="flex items-center gap-2 p-3 rounded-xl border border-ifb-border hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">{loc.icon}</span>
                <div>
                  <p className="font-medium text-sm text-ifb-text">{loc.name}</p>
                  <p className="text-xs text-ifb-green">{loc.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Simulation section */}
      <div className="mb-4">
        <p className="text-center text-xs text-ifb-text-light uppercase tracking-wide font-medium mb-4">
          Simular escaneamento (demonstração)
        </p>
        <div className="grid grid-cols-2 gap-3">
          {simulateLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSimulated(loc)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-ifb-border bg-white hover:bg-ifb-green-light transition-colors"
            >
              <span className="text-2xl">{loc.icon}</span>
              <span className="text-sm font-medium text-ifb-text">{loc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulated result */}
      {simulated && (
        <div className="bg-white rounded-2xl border border-ifb-border p-6 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{simulated.icon}</span>
            <div>
              <h2 className="font-semibold text-ifb-text">{simulated.name}</h2>
              <p className="text-sm text-ifb-text-light">{simulated.location}</p>
            </div>
          </div>
          <p className="text-sm text-ifb-text mb-3">{simulated.description}</p>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="font-bold text-ifb-green">⏱️ {simulated.time}</span>
            <span className="text-ifb-text-light">🕐 {simulated.hours}</span>
          </div>
          <button
            onClick={() => navigate('/acessibilidade')}
            className="btn-primary w-full justify-center"
          >
            🧭 Iniciar navegação
          </button>
        </div>
      )}
    </div>
  )
}
