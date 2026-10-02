/**
 * FeatureSection.jsx — Seção "Funcionalidades" da Home
 *
 * Exibe uma grade de 6 cards com os recursos principais do app e,
 * abaixo dela, três imagens do campus (direção visual "Verde ao ar livre").
 * Cada card tem ícone SVG, título e descrição.
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

// Imagens do campus / rotas acessíveis (biblioteca de imagens do app)
const illustrations = [
  { src: 'https://media.base44.com/images/public/6a9f3f9cdb132332b0b48a9c/11ff223fb_generated_d8183397.jpg', alt: 'Estudante usando o celular com seta de navegação em um corredor do campus' },
  { src: 'https://media.base44.com/images/public/6a9f3f9cdb132332b0b48a9c/90d109f5b_generated_0e3189eb.jpg', alt: 'Placa com QR Code no campus do IFB' },
  { src: 'https://media.base44.com/images/public/6a9f3f9cdb132332b0b48a9c/99e84f3d7_generated_7e020a89.jpg', alt: 'Rota acessível com rampa no campus' },
]

export default function FeatureSection() {
  return (
    <section className="py-[76px] lg:py-[82px] bg-ifb-gray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[30px] lg:text-[37px] leading-[1.1] tracking-[-0.055em] font-extrabold text-ifb-text mb-[11px]">
            Tudo para você se localizar
          </h2>
          <p className="text-[15px] leading-[1.5] text-ifb-text-light">
            Recursos pensados para acessibilidade e facilidade de uso
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rise-card min-h-[188px] p-6 rounded-[21px] border border-ifb-border bg-ifb-cream shadow-[0_5px_16px_#183b1d08] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_#183b1d12] hover:border-[#b8ddc2]"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="w-[47px] h-[47px] rounded-[15px] bg-ifb-green-light text-ifb-green grid place-items-center mb-[15px]">
                <Icon name={f.icon} size={24} strokeWidth={1.8} />
              </div>
              <h3 className="text-[15px] font-extrabold tracking-[-0.025em] text-ifb-text mb-[7px]">{f.title}</h3>
              <p className="text-[13px] leading-[1.58] text-ifb-text-light">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Imagens do campus */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-[22px]">
          {illustrations.map((img) => (
            <div key={img.src} className="h-[146px] overflow-hidden rounded-[20px] bg-ifb-green-light border border-ifb-border">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
