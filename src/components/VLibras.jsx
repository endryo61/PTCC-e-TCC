/**
 * VLibras.jsx — Integração do widget VLibras (tradutor de Libras)
 *
 * Carrega o script oficial do VLibras (vlibras.gov.br) e injeta
 * o DOM necessário no body. O widget aparece como um botão azul
 * flutuante no canto direito da tela.
 *
 * O script é carregado apenas uma vez (ref de controle).
 *
 * @author IFB NavAR Team
 */
import { useEffect, useRef } from 'react'

export default function VLibras() {
  const initialized = useRef(false)

  useEffect(() => {
    // Evita dupla inicialização em StrictMode
    if (initialized.current) return
    initialized.current = true

    // Carrega o script do plugin VLibras
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app')
      }
    }
    document.head.appendChild(script)

    // Cria a estrutura DOM exigida pelo VLibras
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
  }, [])

  return null
}
