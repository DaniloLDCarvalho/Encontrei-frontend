import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchUsers, createReservation } from '../api'

export default function ReservationForm() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ productId: '', buyerId: '', date: '', note: '' })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts().then(setProducts).catch((e) => setError(e.message || String(e)))
    fetchUsers().then(setUsers).catch((e) => setError(e.message || String(e)))
  }, [])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    try {
      if (!form.productId || !form.buyerId || !form.date) throw new Error('Campos obrigatórios faltando')
      await createReservation({
        productId: Number(form.productId),
        buyerId: Number(form.buyerId),
        date: form.date,
        note: form.note
      })
      setMessage('Reserva criada com sucesso!')
      setForm({ productId: '', buyerId: '', date: '', note: '' })
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div className="page">
      <h2>Criar Reserva</h2>
      {message && <div className="ok">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit} className="form">
        <label>Produto
          <select name="productId" value={form.productId} onChange={handle}>
            <option value="">-- selecione --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>

        <label>Comprador
          <select name="buyerId" value={form.buyerId} onChange={handle}>
            <option value="">-- selecione --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </label>

        <label>Data e hora
          <input type="datetime-local" name="date" value={form.date} onChange={handle} />
        </label>

        <label>Observação
          <textarea name="note" value={form.note} onChange={handle} />
        </label>

        <button type="submit">Criar reserva</button>
      </form>
    </div>
  )
}
