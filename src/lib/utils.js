export function cn(...classes) {
  const res = []
  const walk = (v) => {
    if (!v) return
    if (typeof v === 'string') return res.push(v)
    if (Array.isArray(v)) return v.forEach(walk)
    if (typeof v === 'object') {
      for (const k in v) if (v[k]) res.push(k)
      return
    }
  }
  classes.forEach(walk)
  return res.join(' ')
}

