import { useNavigate } from 'react-router-dom'

export default function LocationCard({ location }) {
  const navigate = useNavigate()

  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-ifb-green-light flex items-center justify-center text-2xl">
            {location.icon}
          </div>
          <div>
            <h3 className="font-semibold text-ifb-text">{location.name}</h3>
            <p className="text-sm text-ifb-text-light">{location.floor}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-ifb-green">{location.time}</p>
          <p className="text-xs text-ifb-text-light">{location.distance}</p>
        </div>
      </div>
      <p className="text-sm text-ifb-text-light">{location.description}</p>
      {location.accessible && (
        <div className="flex flex-wrap gap-1.5">
          {location.features.map((f) => (
            <span key={f} className="text-xs bg-ifb-green-light text-ifb-green px-2 py-0.5 rounded-full">
              ♿ {f}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/scanner')}
        className="btn-primary text-sm py-2 mt-1 self-start"
      >
        🧭 Iniciar navegação
      </button>
    </div>
  )
}
