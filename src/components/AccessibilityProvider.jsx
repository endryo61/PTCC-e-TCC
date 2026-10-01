/**
 * AccessibilityProvider.jsx — Contexto global de acessibilidade
 *
 * Resolve o problema das configurações não persistirem entre páginas:
 * carrega as settings do localStorage no mount do App (não só na
 * página /acessibilidade) e aplica as classes CSS no <body> globalmente.
 *
 * @author IFB NavAR Team
 */
import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext(null)

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) return { settings: {}, toggle: () => {}, updateSetting: () => {} }
  return ctx
}

const DEFAULT_SETTINGS = {
  voiceGuide: false,
  highContrast: false,
  largeText: false,
  reduceAnimations: false,
  colorBlindness: 'Nenhum',
  screenReader: false,
}

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  // Carrega configurações salvas no mount do App
  useEffect(() => {
    const saved = localStorage.getItem('ifb-accessibility')
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) })
      } catch { /* ignore */ }
    }
  }, [])

  // Salva e aplica efeitos visuais no body sempre que settings muda
  useEffect(() => {
    localStorage.setItem('ifb-accessibility', JSON.stringify(settings))

    document.body.classList.toggle('high-contrast', settings.highContrast)
    document.body.classList.toggle('large-text', settings.largeText)
    document.body.classList.toggle('reduce-animations', settings.reduceAnimations)

    // Filtros de daltonismo
    document.body.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia')
    if (settings.colorBlindness === 'Protanopia') document.body.classList.add('cb-protanopia')
    if (settings.colorBlindness === 'Deuteranopia') document.body.classList.add('cb-deuteranopia')
    if (settings.colorBlindness === 'Tritanopia') document.body.classList.add('cb-tritanopia')

    // Leitor de tela — adiciona atributos ARIA globais
    document.body.setAttribute('data-screen-reader', settings.screenReader ? 'on' : 'off')
  }, [settings])

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }))
  const updateSetting = (key, value) => setSettings((s) => ({ ...s, [key]: value }))

  return (
    <AccessibilityContext.Provider value={{ settings, toggle, updateSetting, setSettings }}>
      {children}
    </AccessibilityContext.Provider>
  )
}
