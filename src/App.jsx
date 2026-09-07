import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import InstallBanner from './components/InstallBanner.jsx'
import Home from './pages/Home.jsx'
import Scanner from './pages/Scanner.jsx'
import Locations from './pages/Locations.jsx'
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
          <Route path="/acessibilidade" element={<Accessibility />} />
        </Routes>
      </main>
      <InstallBanner />
    </div>
  )
}
