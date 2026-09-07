import { useNavigate } from 'react-router-dom'

export default function BackButton({ fallback = '/' }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(fallback)}
      className="flex items-center gap-1 text-ifb-text-light hover:text-ifb-text transition-colors mb-2"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="text-sm font-medium">Voltar</span>
    </button>
  )
}
