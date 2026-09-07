import { useNavigate } from 'react-router-dom'

export default function LocationCard({ location }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-ifb-border p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{location.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-ifb-text">{location.name}</h3>
          <p className="text-xs text-ifb-text-light">{location.location}</p>
        </div>
        <span className="text-xs font-medium bg-ifb-green-light text-ifb-green px-2 py-0.5 rounded-full">
          {location.category}
        </span>
      </div>
      <p className="text-sm text-ifb-text-light">{location.description}</p>
      <div className="flex items-center gap-4 text-sm pt-2 border-t border-ifb-border">
        <span className="font-bold text-ifb-green">⏱️ {location.time}</span>
        <span className="text-ifb-text-light">🕐 {location.hours}</span>
        {location.accessible && <span className="text-ifb-green">♿</span>}
      </div>
      <button
        onClick={() => navigate('/scanner')}
        className="btn-primary text-sm py-2 self-start"
      >
        Navegar →
      </button>
    </div>
  )
}
