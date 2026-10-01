/**
 * VLibras.jsx — Integração do widget VLibras (tradutor de Libras)
 *
 * Carrega o script oficial do VLibras (vlibras.gov.br) e injeta
 * o DOM necessário no body. O widget aparece como um botão azul
 * flutuante no canto direito da tela.
 *
 * Inclui tratamento de erros e garante que o widget só inicialize
 * após o DOM estar pronto.
 *
 * @author IFB NavAR Team
 */
import { useEffect, useRef } from 'react'

export default function VLibras() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Cria a estrutura DOM exigida pelo VLibras antes de carregar o script
    const container = document.createElement('div')
    container.setAttribute('vw', '')
    container.className = 'enabled'
    container.innerHTML = `
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `
    document.body.appendChild(container)

    // Carrega o script do plugin VLibras
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = () => {
      // Garante que o Widget só é instanciado após o script carregar
      // e o container estar no DOM
      if (window.VLibras && document.querySelector('[vw]')) {
        try {
          new window.VLibras.Widget('https://vlibras.gov.br/app')
        } catch (e) {
          console.warn('VLibras: não foi possível inicializar o widget.', e)
        }
      }
    }
    script.onerror = () => {
      console.warn('VLibras: não foi possível carregar o script. Verifique sua conexão.')
    }
    document.head.appendChild(script)
  }, [])

  return null
}
