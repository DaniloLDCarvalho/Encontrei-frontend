export function useToast() {
  const toasts: any[] = []
  return {
    toast: (opts: any) => {
      toasts.push({ id: Date.now(), ...opts })
      console.log('toast', opts)
    },
    toasts,
  }
}
