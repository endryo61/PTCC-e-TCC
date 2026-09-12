/**
 * FeatureSection.jsx — Seção "Funcionalidades" da Home
 *
 * @author IFB NavAR Team
 */
import Icon from './Icon.jsx'

const features = [
  { icon: 'qrCode', title: 'Escaneie o QR Code', desc: 'Aponte para qualquer QR Code do campus para iniciar a navegação instantaneamente.' },
  { icon: 'ar', title: 'Realidade Aumentada', desc: 'Setas em AR sobrepondo o mundo real guiam você pelo caminho mais curto.' },
  { icon: 'clock', title: 'Tempo e Distância', desc: 'Veja em tempo real quantos metros e minutos faltam para chegar ao destino.' },
  { icon: 'volume', title: 'Guia por Voz', desc: 'Instruções faladas em português para pessoas com deficiência visual.' },
  { icon: 'mic', title: 'Comando de Voz', desc: 'Diga o nome do local e ouça como chegar, sem precisar tocar na tela.' },
  { icon: 'route', title: 'Rotas Acessíveis', desc: 'Rotas otimizadas com indicação de rampas, elevadores e caminhos planos.' },
]

export default function FeatureSection() {
  return (
    <section className="py-16 lg:py-20 bg-ifb-gray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-ifb-text mb-2">
            Tudo para você se localizar
          </h2>
          <p className="text-ifb-text-light">
            Recursos pensados para acessibilidade e facilidade de uso
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-card-hover">
              <div className="w-12 h-12 rounded-lg bg-ifb-green-light flex items-center justify-center text-ifb-green mb-4">
                <Icon name={f.icon} size={24} strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-ifb-text mb-1.5 text-[15px]">{f.title}</h3>
              <p className="text-sm text-ifb-text-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
