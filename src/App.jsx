/**
 * App.jsx — Componente raiz do IFB NavAR
 *
 * Define a estrutura base do app:
 * - Navbar (fixa no topo)
 * - Rotas (React Router v6)
 * - InstallBanner (banner PWA)
 * - FeedbackButton (botão flutuante)
 * - VLibras (widget de tradução para Libras)
 *
 * Para adicionar uma nova página:
 * 1. Crie o componente em src/pages/
 * 2. Importe-o aqui
 * 3. Adicione uma <Route> abaixo
 * 4. Adicione o link em src/components/Navbar.jsx
 *
 * @author IFB NavAR Team
 */
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import InstallBanner from './components/InstallBanner.jsx'
import FeedbackButton from './components/FeedbackButton.jsx'
import VLibras from './components/VLibras.jsx'
import Home from './pages/Home.jsx'
import Scanner from './pages/Scanner.jsx'
import Locations from './pages/Locations.jsx'
import MapaInterno from './pages/MapaInterno.jsx'
import Accessibility from './pages/Accessibility.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/locais" element={<Locations />} />
          <Route path="/mapa-interno" element={<MapaInterno />} />
          <Route path="/acessibilidade" element={<Accessibility />} />
        </Routes>
      </main>
      <InstallBanner />
      <FeedbackButton />
      <VLibras />
    </div>
  )
}
