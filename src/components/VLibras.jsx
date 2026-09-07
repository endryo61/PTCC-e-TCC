import { useEffect, useRef } from 'react'

export default function VLibras() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Load VLibras plugin script
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app')
      }
    }
    document.head.appendChild(script)

    // Create VLibras DOM structure
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
