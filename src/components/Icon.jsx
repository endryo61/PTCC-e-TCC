/**
 * Icons.jsx — Sistema de ícones SVG para o IFB NavAR
 *
 * Substitui emojis por ícones vetoriais limpos e profissionais.
 * Cada ícone aceita props padrão de SVG (className, size, etc.).
 *
 * Para adicionar um novo ícone:
 * 1. Adicione uma nova entrada no objeto `icons` abaixo
 * 2. Use <Icon name="nome-do-icone" /> no componente
 *
 * @author IFB NavAR Team
 */

const icons = {
  // Navegação
  home: 'M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z',
  scan: 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18',
  pin: 'M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10z M12 11h.01',
  map: 'M9 4l6 2 6-2v16l-6 2-6-2-6 2V6l6-2z M9 4v16 M15 6v16',
  accessibility: 'M12 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M4 8h16 M12 8v6 M9 14l-2 7 M15 14l2 7 M12 14l-3 7 M12 14l3 7',
  // Ações
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  chevronRight: 'M9 18l6-6-6-6',
  close: 'M18 6L6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  // Funcionalidades
  qrCode: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM20 20h1v1h-1z',
  ar: 'M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z M9 12l2 2 4-4',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  volume: 'M11 5L6 9H2v6h4l5 4V5z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14',
  mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M8 17h8a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8',
  // Feedback e instalação
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  // Acessibilidade
  contrast: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 2v20 M12 2a10 10 0 0 0 0 20',
  textSize: 'M4 7V4h16v3 M9 20h6 M12 4v16',
  sparkles: 'M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z',
  palette: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  headphones: 'M3 14a9 9 0 0 1 18 0 M21 14v5a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2z M3 14v5a2 2 0 0 0 2 2h2v-7H5a2 2 0 0 0-2 2z',
  signLanguage: 'M9 11V6a2 2 0 1 1 4 0v5 M13 11V4a2 2 0 1 1 4 0v9a6 6 0 0 1-6 6H9a6 6 0 0 1-5-3l-1-2',
  // Locais (ícones de categoria)
  book: 'M4 4a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V4z M4 18a2 2 0 0 1 2-2h12',
  building: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4 M9 9v.01 M9 12v.01 M9 15v.01 M9 18v.01',
  flask: 'M9 3h6 M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3 M8 14h8',
  utensils: 'M3 2v7a3 3 0 0 0 3 3v10 M3 2v3a3 3 0 0 1 6 0 M9 2v20 M16 2v20 M16 8h4 M16 14h4',
  dumbbell: 'M6 4v16 M2 8v8 M10 6v12 M14 6v12 M18 4v16 M22 8v8 M10 10h4 M10 14h4',
  graduation: 'M12 4L1 10l11 6 9-4.9V17 M7 13v5a5 3 0 0 0 10 0v-5',
  wheelchair: 'M8 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M8 7v6h8l3 6 M8 13a5 5 0 1 0 5 5',
  // Status
  check: 'M20 6L9 17l-5-5',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01',
  // Mapa
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M16 8l-2 6-6 2 2-6 6-2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
}

/**
 * Componente Icon — renderiza um ícone SVG pelo nome.
 *
 * @param {string} name - Nome do ícone (ver objeto `icons` acima)
 * @param {number} size - Tamanho em px (padrão: 20)
 * @param {string} className - Classes CSS adicionais
 * @param {string} strokeWidth - Espessura da linha (padrão: 1.8)
 */
export default function Icon({ name, size = 20, className = '', strokeWidth = 1.8 }) {
  const path = icons[name]
  if (!path) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path.split(' M').map((d, i) => (
        <path key={i} d={i === 0 ? d : 'M' + d} />
      ))}
    </svg>
  )
}
