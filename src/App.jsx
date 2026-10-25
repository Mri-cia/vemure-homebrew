import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import HomePage from './pages/home'
import EquipmentPage from './pages/equipment'
import SkillsPage from './pages/skills'
import TraitsPage from './pages/traits'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/traits" element={<TraitsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
