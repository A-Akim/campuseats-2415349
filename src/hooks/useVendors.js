import { useState, useEffect, useCallback } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)   // starts true on mount
  const [error, setError] = useState(null)        // starts null on mount
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setLoading(true)   // ← OK here: this is in an event handler, not an effect
    setError(null)
    setReloadKey((k) => k + 1)
  }, [])

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!ignore) setVendors(data)
      })
      .catch((err) => {
        if (!ignore && err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [reloadKey])

  return { vendors, loading, error, reload }
}