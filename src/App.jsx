import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar/Navbar"
import Dashboard from "./pages/Dashboard"
import ListView from "./pages/ListView"


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/list/:listId" element={<ListView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
