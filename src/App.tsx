import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { MyPerformance } from './components/MyPerformance'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-performance" element={<MyPerformance />} />
      </Routes>
    </Router>
  )
}

export default App
