// Simple API client using fetch and relative URLs so Vite proxy works in dev
const handleJson = async (res) => {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

const isDev = typeof import.meta !== 'undefined' ? import.meta.env && import.meta.env.MODE === 'development' : true

// Mock data for development so frontend can run without backend
const DEV_MOCK = {
  products: [
    { id: 1, name: 'Produto A', price: 10.5 },
    { id: 2, name: 'Produto B', price: 20 },
    { id: 3, name: 'Produto C', price: 15 }
  ],
  stores: [
    { id: 1, name: 'Loja Central', address: 'Rua A, 123' }
  ],
  users: [
    { id: 1, name: 'Comprador Teste' }
  ],
  reservations: []
}

export async function fetchProducts() {
  if (isDev) return Promise.resolve(DEV_MOCK.products)
  const res = await fetch('/products')
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}

export async function fetchProduct(id) {
  if (isDev) return Promise.resolve(DEV_MOCK.products.find(p => p.id === Number(id)))
  const res = await fetch(`/products/${id}`)
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}

export async function fetchStores() {
  if (isDev) return Promise.resolve(DEV_MOCK.stores)
  const res = await fetch('/stores')
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}

export async function fetchUsers() {
  if (isDev) return Promise.resolve(DEV_MOCK.users)
  const res = await fetch('/users')
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}

export async function fetchReservations() {
  if (isDev) return Promise.resolve(DEV_MOCK.reservations)
  const res = await fetch('/reservations')
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}

export async function createReservation(payload) {
  if (isDev) {
    const newRes = { id: Date.now(), ...payload }
    DEV_MOCK.reservations.push(newRes)
    return Promise.resolve(newRes)
  }
  const res = await fetch('/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const body = await handleJson(res)
    const msg = typeof body === 'object' ? (body.error || body.message || JSON.stringify(body)) : body
    throw new Error(msg)
  }
  return handleJson(res)
}
