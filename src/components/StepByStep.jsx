/**
 * StepByStep.jsx — Seção "Passo a Passo" da Home
 *
 * @author IFB NavAR Team
 */
const steps = [
  { num: '01', title: 'Localize um QR Code', desc: 'Painéis com QR Code estão na entrada e pontos estratégicos do campus.' },
  { num: '02', title: 'Escaneie com o app', desc: 'Abra o scanner e aponte para o código. Sua posição é detectada automaticamente.' },
  { num: '03', title: 'Escolha o destino', desc: 'Selecione para onde quer ir na lista de locais do campus.' },
  { num: '04', title: 'Siga as indicações', desc: 'Setas AR e voz guiam você passo a passo até chegar.' },
]

export default function StepByStep() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-ifb-text mb-12">
          Simples e rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-lg bg-ifb-green text-white text-lg font-bold flex items-center justify-center mb-4 shadow-soft">
                {s.num}
              </div>
              <h3 className="font-semibold text-ifb-text mb-1.5 text-[15px]">{s.title}</h3>
              <p className="text-sm text-ifb-text-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
