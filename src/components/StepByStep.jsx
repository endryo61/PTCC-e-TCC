/**
 * StepByStep.jsx — Seção "Passo a Passo" da Home
 *
 * Mostra 4 passos numerados de como usar o app.
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
    <section className="py-[76px] lg:py-[81px] bg-ifb-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-[30px] lg:text-[37px] leading-[1.1] tracking-[-0.055em] font-extrabold text-center text-ifb-text mb-11">
          Simples e rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {steps.map((s) => (
            <div key={s.num} className="relative text-center px-[13px]">
              <div className="w-[54px] h-[54px] mx-auto mb-[18px] rounded-[18px] bg-ifb-green text-white text-[17px] font-extrabold grid place-items-center shadow-[0_8px_18px_#3fa86a38]">
                {s.num}
              </div>
              <h3 className="text-[15px] font-extrabold text-ifb-text mb-2">{s.title}</h3>
              <p className="text-[13px] leading-[1.65] text-ifb-text-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
