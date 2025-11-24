import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message || String(err)))
  }, [])

  if (error) return <div className="error">Erro: {error}</div>

  return (
    <div className="page">
      <h2>Produtos</h2>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p className="price">R$ {p.price}</p>
            <Link to={`/products/${p.id}`}>Ver</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
