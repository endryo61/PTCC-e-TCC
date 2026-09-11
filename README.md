# IFB NavAR — Navegação Acessível do Campus

Aplicação web progressiva (PWA) para navegação no campus do **Instituto Federal de Brasília (IFB)** com QR Code, realidade aumentada, guia por voz e acessibilidade completa — incluindo tradução para Libras via VLibras.

## 🎯 Sobre o projeto

O IFB NavAR ajuda estudantes, servidores e visitantes a se localizarem no campus. Escaneie um QR Code, escolha o destino e receba direções em AR com áudio. Pensado para ser acessível a todos, incluindo pessoas com deficiência visual, auditiva e motora.

## 📄 Páginas

| Rota            | Página          | Descrição                                           |
|-----------------|-----------------|-----------------------------------------------------|
| `/`             | Início          | Hero, funcionalidades, passo a passo e CTA          |
| `/scanner`      | Escanear        | Scanner de QR Code via câmera + simulação           |
| `/locais`       | Locais          | Lista de 8 locais com busca e filtro por categoria   |
| `/mapa-interno` | Mapa Interno    | Mapa visual do campus + lista de 10 locais           |
| `/acessibilidade` | Acessibilidade | Configurações de acessibilidade + comando de voz    |

## ♿ Recursos de Acessibilidade

- **Guia por Voz** — síntese de voz em português (Web Speech API)
- **Comando de Voz** — reconhecimento de voz para buscar locais
- **Alto Contraste** — aumenta o contraste da interface
- **Texto Grande** — aumenta o tamanho das letras
- **Reduzir Animações** — remove animações para sensibilidade a movimento
- **Daltonismo** — ajuste de cores (Protanopia, Deuteranopia, Tritanopia)
- **Leitor de Tela** — otimização para VoiceOver/TalkBack
- **VLibras** — tradução automática para Língua Brasileira de Sinais

Todas as configurações são persistidas em `localStorage` e aplicadas em todo o app.

## 🛠️ Stack

- **React 18** + **Vite 5** — framework e bundler
- **React Router v6** — roteamento
- **Tailwind CSS 3** — estilização
- **html5-qrcode** — escaneamento de QR Code
- **Web Speech API** — síntese e reconhecimento de voz
- **VLibras** — tradução para Libras (vlibras.gov.br)
- **PWA** — instalável com manifest e service worker

## 📁 Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Icon.jsx         # Sistema de ícones SVG
│   ├── Navbar.jsx       # Barra de navegação
│   ├── BackButton.jsx   # Botão "Voltar"
│   ├── FeedbackButton.jsx # Botão flutuante de feedback
│   ├── InstallBanner.jsx  # Banner de instalação PWA
│   ├── VLibras.jsx      # Widget VLibras (Libras)
│   ├── LocationCard.jsx # Card de local
│   ├── FeatureSection.jsx # Seção de funcionalidades (Home)
│   └── StepByStep.jsx   # Seção passo a passo (Home)
├── pages/              # Páginas/rotas
│   ├── Home.jsx
│   ├── Scanner.jsx
│   ├── Locations.jsx
│   ├── MapaInterno.jsx
│   └── Accessibility.jsx
├── data/
│   └── locations.js    # Dados de locais do campus
├── App.jsx             # Componente raiz + rotas
├── main.jsx            # Entry point
└── index.css           # Estilos globais + Tailwind
```

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Docker (opcional)

```bash
docker compose -f docker-compose.base44.yml up -d
```

## 📝 Como modificar

### Adicionar um novo local
Edite `src/data/locations.js` e adicione um objeto ao array `locations`.

### Adicionar uma nova página
1. Crie o componente em `src/pages/`
2. Importe em `src/App.jsx` e adicione uma `<Route>`
3. Adicione o link em `src/components/Navbar.jsx`

### Adicionar um novo ícone
Adicione a entrada no objeto `icons` em `src/components/Icon.jsx`.

### Alterar cores
Edite a paleta em `tailwind.config.js` (seção `colors.ifb`).

## 📦 Dependências

| Pacote          | Versão | Função                        |
|-----------------|--------|-------------------------------|
| react           | 18     | Framework UI                  |
| react-dom       | 18     | Renderização React            |
| react-router-dom| 6      | Roteamento                    |
| html5-qrcode   | 2.3    | Scanner de QR Code            |
| tailwindcss     | 3      | Estilização CSS               |
| vite            | 5      | Bundler e dev server          |

## 👥 Autores

Desenvolvido para o **Instituto Federal de Brasília (IFB)** — Campus Brasília.

## 📄 Licença

Projeto educacional. Uso livre para fins acadêmicos.
