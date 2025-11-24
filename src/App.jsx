import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import StoreList from './components/StoreList'
import ReservationForm from './components/ReservationForm'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1>Encontrei</h1>
        <nav>
          <Link to="/">Produtos</Link>
          <Link to="/stores">Lojas</Link>
          <Link to="/reservations">Reservar</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/reservations" element={<ReservationForm />} />
        </Routes>
      </main>

      <footer className="footer">Encontrei — Frontend de desenvolvimento</footer>
    </div>
  )
}
