import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../api'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || String(err)))
  }, [id])

  if (error) return <div className="error">Erro: {error}</div>
  if (!product) return <div>Carregando...</div>

  return (
    <div className="page">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">R$ {product.price}</p>
      <div>
        <Link to="/reservations">Reservar</Link>
      </div>
    </div>
  )
}
