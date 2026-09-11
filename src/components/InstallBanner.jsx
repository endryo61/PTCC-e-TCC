/**
 * InstallBanner.jsx — Banner de instalação PWA
 *
 * Exibe um card com borda tracejada convidando o usuário a
 * instalar o app na tela inicial. Captura o evento
 * `beforeinstallprompt` para mostrar o prompt nativo quando
 * disponível, ou exibe instruções manuais caso contrário.
 *
 * @author IFB NavAR Team
 */
import { useState, useEffect } from 'react'
import Icon from './Icon.jsx'

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  // Captura o evento de instalação PWA (Chrome/Edge)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    } else {
      alert('Para instalar: no Chrome, toque no menu (⋮) e selecione "Instalar app". No Safari, toque em Compartilhar e "Adicionar à Tela de Início".')
    }
  }

  if (dismissed) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl border-2 border-dashed border-ifb-border p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-ifb-green-light flex items-center justify-center text-ifb-green">
          <Icon name="download" size={20} strokeWidth={2} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-ifb-text">Instalar no celular</p>
          <p className="text-xs text-ifb-text-light">Acesse com um toque, como um app nativo</p>
        </div>
        <button onClick={handleInstall} className="btn-primary text-sm py-2 px-4">
          Instalar
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-ifb-text-light hover:text-ifb-text p-1"
          aria-label="Fechar"
        >
          <Icon name="close" size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
