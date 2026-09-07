export default function FeatureSection() {
  const features = [
    {
      icon: '📷',
      title: 'Escaneie o QR Code',
      desc: 'Aponte para qualquer QR Code do campus para iniciar a navegação instantaneamente.',
    },
    {
      icon: '🥽',
      title: 'Realidade Aumentada',
      desc: 'Setas em AR sobrepondo o mundo real guiam você pelo caminho mais curto.',
    },
    {
      icon: '⏱️',
      title: 'Tempo e Distância',
      desc: 'Veja em tempo real quantos metros e minutos faltam para chegar ao destino.',
    },
    {
      icon: '🔊',
      title: 'Guia por Voz',
      desc: 'Instruções faladas em português para pessoas com deficiência visual.',
    },
    {
      icon: '🎤',
      title: 'Comando de Voz',
      desc: 'Diga o nome do local e ouça como chegar, sem precisar tocar na tela.',
    },
    {
      icon: '♿',
      title: 'Rotas Acessíveis',
      desc: 'Rotas otimizadas com indicação de rampas, elevadores e caminhos planos.',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-ifb-text mb-2">
          Tudo para você se localizar
        </h2>
        <p className="text-center text-ifb-text-light mb-10">
          Recursos pensados para acessibilidade e facilidade de uso
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-ifb-green-light flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-ifb-text mb-2">{f.title}</h3>
              <p className="text-sm text-ifb-text-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
