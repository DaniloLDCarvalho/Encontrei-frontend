type ClassValue = string | false | null | undefined | { [k: string]: any } | Array<ClassValue>

export function cn(...classes: ClassValue[]) {
  const res: string[] = []
  const walk = (v: ClassValue) => {
    if (!v) return
    if (typeof v === 'string') return res.push(v)
    if (Array.isArray(v)) return v.forEach(walk)
    if (typeof v === 'object') {
      for (const k in v) if ((v as any)[k]) res.push(k)
      return
    }
  }
  classes.forEach(walk)
  return res.join(' ')
}
