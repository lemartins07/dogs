import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login/Login'
import Footer from './components/Footer'
import { UserStorage } from './context/UserContext'

import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
