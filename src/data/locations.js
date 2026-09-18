/**
 * locations.js — Dados de locais do campus IFB Brasília
 *
 * @author IFB NavAR Team
 */

// ============================================
// LOCAIS — Página /locais (8 locais)
// ============================================
export const locations = [
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    icon: '📋',
    category: 'Acadêmico',
    time: '3 min',
    distance: '150 m',
    hours: 'Seg–Sex 8h–21h',
    location: 'Bloco A · Térreo',
    description: 'Acervo bibliográfico com livros técnicos, científicos e literários. Computadores para pesquisa e espaço de estudo individual e em grupo.',
    accessible: true,
  },
  {
    id: 'registro',
    name: 'Registro Acadêmico',
    icon: '🏢',
    category: 'Administrativo',
    time: '5 min',
    distance: '200 m',
    hours: 'Seg–Sex 8h–17h',
    location: 'Bloco A · 1º Andar',
    description: 'Serviços de matrícula, histórico escolar, declarações, diplomas e outros documentos acadêmicos. Atendimento presencial e online.',
    accessible: true,
  },
  {
    id: 'lab-info',
    name: 'Laboratório de Informática',
    icon: '🔬',
    category: 'Laboratório',
    time: '7 min',
    distance: '350 m',
    hours: 'Seg–Sex 7h–22h',
    location: 'Bloco B · 2º Andar',
    description: 'Laboratório equipado com computadores de alta performance para aulas práticas de programação, redes e design.',
    accessible: true,
  },
  {
    id: 'auditorio',
    name: 'Auditório',
    icon: '📋',
    category: 'Acadêmico',
    time: '4 min',
    distance: '180 m',
    hours: 'Sob agendamento',
    location: 'Bloco C · Térreo',
    description: 'Espaço para eventos, palestras, formaturas e reuniões. Capacidade para 200 pessoas com sistema de som e projeção.',
    accessible: true,
  },
  {
    id: 'coordenacao',
    name: 'Coordenação de Cursos',
    icon: '📋',
    category: 'Acadêmico',
    time: '4 min',
    distance: '180 m',
    hours: 'Seg–Sex 8h–17h',
    location: 'Bloco Administrativo · 1º Andar',
    description: 'Coordenação dos cursos técnicos e superiores. Atendimento sobre questões pedagógicas, aproveitamento de estudos e matrículas.',
    accessible: true,
  },
  {
    id: 'ginasio',
    name: 'Ginásio de Esportes',
    icon: '🌿',
    category: 'Lazer',
    time: '8 min',
    distance: '400 m',
    hours: 'Seg–Sex 7h–21h | Sáb 8h–12h',
    location: 'Área Esportiva · Térreo',
    description: 'Ginásio poliesportivo para prática de basquete, vôlei, futsal e outras modalidades. Quadras e vestiários disponíveis.',
    accessible: true,
  },
  {
    id: 'secretaria',
    name: 'Secretaria Geral',
    icon: '🏢',
    category: 'Administrativo',
    time: '3 min',
    distance: '120 m',
    hours: 'Seg–Sex 8h–17h',
    location: 'Bloco Administrativo · Térreo',
    description: 'Atendimento geral, informações sobre o campus, protocolo de documentos e serviços administrativos para alunos e servidores.',
    accessible: true,
  },
  {
    id: 'cantina',
    name: 'Cantina',
    icon: '🛠',
    category: 'Serviços',
    time: '2 min',
    distance: '80 m',
    hours: 'Seg–Sex 6h30–20h',
    location: 'Bloco Serviços · Térreo',
    description: 'Refeitório com refeições variadas, lanches e bebidas. Atende alunos, servidores e visitantes com preços acessíveis.',
    accessible: true,
  },
]

export const categories = ['Todos', 'Acadêmico', 'Administrativo', 'Serviços', 'Lazer', 'Laboratório']

// ============================================
// MAPA — Página /mapa-interno (10 locais)
// ============================================
export const mapLocations = [
  { id: 'entrada', name: 'Entrada Principal', icon: '🚪', sub: 'Portão', time: null, distance: null, category: 'Acesso' },
  { id: 'recepcao', name: 'Recepção / Guarita', icon: '🏠', sub: '1 min', time: '1 min', distance: '50 m', category: 'Acesso' },
  { id: 'bloco-a', name: 'Bloco A', icon: '🏢', sub: '3 min', time: '3 min', distance: '150 m', category: 'Adm.' },
  { id: 'bloco-b', name: 'Bloco B', icon: '📚', sub: '4 min', time: '4 min', distance: '200 m', category: 'Ensino' },
  { id: 'bloco-c', name: 'Bloco C', icon: '🔬', sub: '5 min', time: '5 min', distance: '250 m', category: 'Ensino' },
  { id: 'biblioteca-map', name: 'Biblioteca', icon: '📖', sub: '4 min', time: '4 min', distance: '180 m', category: 'Ensino' },
  { id: 'cantina-map', name: 'Cantina / Restaurante', icon: '🍽️', sub: '5 min', time: '5 min', distance: '220 m', category: 'Serviços' },
  { id: 'quadra-map', name: 'Quadra Esportiva', icon: '⚽', sub: '6 min', time: '6 min', distance: '300 m', category: 'Lazer' },
  { id: 'estacionamento', name: 'Estacionamento', icon: '🅿️', sub: '2 min', time: '2 min', distance: '100 m', category: 'Acesso' },
  { id: 'coord-pedagogica', name: 'Coordenação Pedagógica', icon: '🎓', sub: '4 min', time: '4 min', distance: '180 m', category: 'Ensino' },
]

export const mapCategories = ['Todos', 'Ensino', 'Adm.', 'Serviços', 'Acesso', 'Lazer']
