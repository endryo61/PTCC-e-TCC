/**
 * LocationCard.jsx — Card de local exibido na página /locais
 *
 * Mostra ícone, nome, localização (bloco/andar), categoria,
 * descrição, tempo de deslocamento, horário de funcionamento
 * e botão "Navegar" que direciona para o scanner.
 *
 * @param {object} location - Objeto de local (ver data/locations.js)
 * @author IFB NavAR Team
 */
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function LocationCard({ location }) {
  const navigate = useNavigate()

  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-card-hover">
      {/* Cabeçalho: ícone + nome + badge de categoria */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-ifb-green-light flex items-center justify-center text-xl shrink-0">
          {location.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ifb-text text-[15px]">{location.name}</h3>
          <p className="text-xs text-ifb-text-light mt-0.5">{location.location}</p>
        </div>
        <span className="text-xs font-medium bg-ifb-green-light text-ifb-green px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
          {location.category}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-ifb-text-light leading-relaxed">{location.description}</p>

      {/* Rodapé: tempo + horário + acessibilidade */}
      <div className="flex items-center gap-4 text-sm pt-3 border-t border-ifb-border flex-wrap">
        <span className="flex items-center gap-1.5 font-semibold text-ifb-green">
          <Icon name="clock" size={14} strokeWidth={2} />
          {location.time}
        </span>
        <span className="flex items-center gap-1.5 text-ifb-text-light">
          <Icon name="clock" size={14} strokeWidth={2} />
          {location.hours}
        </span>
        {location.accessible && (
          <span className="text-ifb-green" title="Local acessível">
            <Icon name="wheelchair" size={16} strokeWidth={2} />
          </span>
        )}
      </div>

      {/* Botão de navegação */}
      <button
        onClick={() => navigate('/scanner')}
        className="flex items-center gap-1.5 text-ifb-green font-medium text-sm hover:gap-2.5 transition-all self-start group"
      >
        Navegar
        <Icon name="arrowRight" size={16} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
