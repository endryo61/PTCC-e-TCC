import { useState, useEffect } from 'react'

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50">
      <div className="card border-2 border-dashed border-ifb-green p-4 flex items-center gap-3 bg-white">
        <div className="w-10 h-10 rounded-xl bg-ifb-green-light flex items-center justify-center text-xl">
          📲
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-ifb-text">Instalar no celular</p>
          <p className="text-xs text-ifb-text-light">Acesse com um toque, como um app nativo</p>
        </div>
        <button onClick={handleInstall} className="btn-primary text-sm py-2 px-4">
          Instalar
        </button>
      </div>
    </div>
  )
}
