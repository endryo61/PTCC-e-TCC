import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations.js'

export default function Scanner() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
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

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-ifb-text mb-2">Escanear QR Code</h1>
      <p className="text-ifb-text-light mb-6">
        Aponte a câmera para um QR Code do campus para iniciar a navegação.
      </p>

      {/* Scanner area */}
      <div className="card p-4 mb-6">
        <div id={containerId} className="w-full min-h-[300px] rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
          {!scanning && !result && (
            <div className="text-center text-white/60 py-20">
              <span className="text-5xl block mb-3">📷</span>
              <p className="text-sm">Toque em "Iniciar Scanner" para começar</p>
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
              📷 Iniciar Scanner
            </button>
          ) : (
            <button onClick={stopScanner} className="btn-outline flex-1 justify-center">
              ⏹️ Parar Scanner
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="card p-6 mb-6">
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
          <div className="grid gap-2">
            {locations.slice(0, 4).map((loc) => (
              <button
                key={loc.id}
                onClick={() => navigate('/locais')}
                className="flex items-center gap-3 p-3 rounded-xl border border-ifb-border hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">{loc.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm text-ifb-text">{loc.name}</p>
                  <p className="text-xs text-ifb-text-light">{loc.floor}</p>
                </div>
                <span className="text-sm font-bold text-ifb-green">{loc.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demo info */}
      <div className="card p-5 bg-ifb-green-light border-ifb-green">
        <p className="text-sm text-ifb-text">
          💡 <strong>Dica:</strong> Os QR Codes estão na entrada e pontos estratégicos do campus.
          Se estiver testando no computador, você pode usar uma imagem de QR Code da web.
        </p>
      </div>
    </div>
  )
}
