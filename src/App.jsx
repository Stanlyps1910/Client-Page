import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Chats from './pages/Chats'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/chats" element={<Chats />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
