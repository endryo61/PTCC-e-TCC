/**
 * VoiceSpeedControl.jsx — Controle de velocidade da fala (instruções de voz)
 *
 * Lê e salva a velocidade da fala na preferência global `voiceRate`
 * (AccessibilityProvider), aplicada a todas as sínteses de voz do app.
 *
 * @param {'light'|'overlay'} variant - 'light' para páginas claras, 'overlay' para HUD escuro
 * @author IFB NavAR Team
 */
import Icon from './Icon.jsx'
import { useAccessibility } from './AccessibilityProvider.jsx'

export const MIN_SPEECH_RATE = 0.5
export const MAX_SPEECH_RATE = 2

export default function VoiceSpeedControl({ variant = 'light', className = '' }) {
  const { settings, updateSetting } = useAccessibility()
  const rate = settings.voiceRate ?? 1
  const isOverlay = variant === 'overlay'

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
        isOverlay
          ? 'bg-white/15 backdrop-blur-md border-white/10'
          : 'bg-ifb-green-light border-ifb-green/20'
      } ${className}`}
    >
      <Icon
        name="gauge"
        size={18}
        strokeWidth={2}
        className={`shrink-0 ${isOverlay ? 'text-white/70' : 'text-ifb-green'}`}
      />
      <span
        className={`text-xs font-medium shrink-0 ${isOverlay ? 'text-white/70' : 'text-ifb-text-light'}`}
      >
        Velocidade da voz
      </span>
      <input
        type="range"
        min={MIN_SPEECH_RATE}
        max={MAX_SPEECH_RATE}
        step="0.1"
        value={rate}
        onChange={(e) => updateSetting('voiceRate', parseFloat(e.target.value))}
        className="flex-1 accent-ifb-green"
        aria-label="Velocidade da fala"
        aria-valuetext={`${Number(rate).toFixed(1)}x`}
      />
      <span
        className={`text-sm font-bold w-10 text-right tabular-nums ${
          isOverlay ? 'text-white' : 'text-ifb-text'
        }`}
      >
        {Number(rate).toFixed(1)}x
      </span>
    </div>
  )
}
