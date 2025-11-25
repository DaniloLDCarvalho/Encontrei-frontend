import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import VendorHome from './app/vendedorHomepage'
import BuyerHome from './app/buyerHomepage.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <nav>
          <Link to="/">Vendedor</Link>
          <Link to="/vendor">Vendedor Home</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<VendorHome />} />
          <Route path="/vendor" element={<VendorHome />} />
          <Route path="/buyer" element={<BuyerHome />} />
        </Routes>
      </main>

      <footer className="footer">Encontrei — Frontend de desenvolvimento</footer>
    </div>
  )
}
