// Simple API client using fetch and relative URLs so Vite proxy works in dev
const handleJson = async (res) => {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export async function fetchProducts() {
  const res = await fetch('/products')
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}

export async function fetchProduct(id) {
  const res = await fetch(`/products/${id}`)
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}

export async function fetchStores() {
  const res = await fetch('/stores')
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}

export async function fetchUsers() {
  const res = await fetch('/users')
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}

export async function fetchReservations() {
  const res = await fetch('/reservations')
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}

export async function createReservation(payload) {
  const res = await fetch('/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(await handleJson(res))
  return handleJson(res)
}
