import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import VendorHome from './app/vendedorHomepage'
import BuyerHome from './app/buyerHomepage.jsx'
import VendorProductsPage from "@/modules/vendor/vendorProductsPage/VendorProductsPage.jsx";
import BuyerProductsPage from "@/modules/buyer/buyerProductsPage/BuyerProductsPage";
import ProductFormPage from "@/modules/vendor/ProductFormPage/ProductFormPage";

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
          <Route path="/vendor/products" element={<VendorProductsPage/>} />
          <Route path="/buyer/products" element={<BuyerProductsPage/>} />
          <Route path="/product/new" element={<ProductFormPage/>} />
          <Route path="/product/edit/:id" element={<ProductFormPage/>} />

        </Routes>
      </main>

      <footer className="footer">Encontrei — Frontend de desenvolvimento</footer>
    </div>
  )
}
