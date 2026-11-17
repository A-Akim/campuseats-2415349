import { useEffect, useState } from 'react'
import { useAuth } from './useAuth.js'
import { subscribeToRecentlyViewed, saveRecentlyViewed } from '../services/recent.js'

export function useRecentlyViewed() {
  const { user } = useAuth()
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    if (!user) 
      return

    const unsubscribe = subscribeToRecentlyViewed(
      user.uid,
      (items) => setRecentlyViewed(items),
      (err) => console.error('Recently viewed listener error:', err)
    )

    return unsubscribe 
  }, [user])

  async function addRecentItem(item, vendorId, vendorName) {
    if (!user) return

    const filtered = recentlyViewed.filter((i) => i.id !== item.id)
    
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      vendorId,
      vendorName,
    }
    const updated = [newItem, ...filtered].slice(0, 5)

    try {
      await saveRecentlyViewed(user.uid, updated)
    } catch (err) {
      console.error('Failed to save recently viewed:', err)
    }
  }

  async function clearRecent() {
    if (!user) return
    try {
      await saveRecentlyViewed(user.uid, [])
    } catch (err) {
      console.error('Failed to clear recently viewed:', err)
    }
  }

  return { recentlyViewed, addRecentItem, clearRecent }
}