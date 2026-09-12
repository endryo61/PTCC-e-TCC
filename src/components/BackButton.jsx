/**
 * BackButton.jsx — Botão "Voltar" usado no topo das páginas internas
 *
 * @param {string} fallback - Rota de destino ao clicar (padrão: '/')
 * @author IFB NavAR Team
 */
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function BackButton({ fallback = '/' }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(fallback)}
      className="flex items-center gap-1.5 text-ifb-text-light hover:text-ifb-text transition-colors mb-3 group min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40 rounded-lg"
    >
      <Icon name="arrowLeft" size={18} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-sm font-medium">Voltar</span>
    </button>
  )
}
