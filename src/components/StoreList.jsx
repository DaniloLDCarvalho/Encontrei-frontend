import React, { useEffect, useState } from 'react'
import { fetchStores } from '../api'

export default function StoreList() {
  const [stores, setStores] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStores()
      .then((data) => setStores(data))
      .catch((err) => setError(err.message || String(err)))
  }, [])

  if (error) return <div className="error">Erro: {error}</div>

  return (
    <div className="page">
      <h2>Lojas</h2>
      <ul>
        {stores.map((s) => (
          <li key={s.id}>{s.name} — {s.city}</li>
        ))}
      </ul>
    </div>
  )
}
