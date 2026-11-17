import { useEffect, useState } from 'react'
import { subscribeToVendors } from '../services/vendors.js'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const unsubscribe = subscribeToVendors(
      (data) => { 
        setVendors(data)
        setLoading(false) 
      },
      (err) => { 
        setError(err.message)
        setLoading(false) 
      },
    )
    return unsubscribe // stop listening when the component unmounts
  }, [reloadKey])

  // Move state resets to the reload function handler instead of inside the effect body
  const reload = () => {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }

  return { vendors, loading, error, reload }
}