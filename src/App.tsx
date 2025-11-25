import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { MyPerformance } from './components/MyPerformance'
import { GoalActionModules } from './components/GoalActionModules'
import { Layout } from './components/Layout'
import { LoginModal, type LoginUser } from './components/LoginModal'
import { EmployeeProvider } from './context/EmployeeContext'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount to persist login state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: LoginUser) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginModal onLogin={handleLogin} />} />
          <Route element={<Layout user={currentUser} onLogout={handleLogout} />}>
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/my-performance" element={isLoggedIn ? <MyPerformance /> : <Navigate to="/login" replace />} />
            <Route path="/my-performance/init-goal" element={isLoggedIn ? <GoalActionModules /> : <Navigate to="/login" replace />} />
            <Route path="/my-performance/create-goal" element={isLoggedIn ? <GoalActionModules /> : <Navigate to="/login" replace />} />
            <Route path="/my-performance/goal-review" element={isLoggedIn ? <GoalActionModules /> : <Navigate to="/login" replace />} />
            <Route path="/my-performance/employee-comments" element={isLoggedIn ? <GoalActionModules /> : <Navigate to="/login" replace />} />
          </Route>
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  )
}

export default App
