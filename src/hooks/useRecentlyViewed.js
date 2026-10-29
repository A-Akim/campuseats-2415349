import { useLocalStorage } from './useLocalStorage'

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  function addRecentItem(item, vendorId, vendorName) {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id)
      return [{ ...item, vendorId, vendorName }, ...filtered].slice(0, 5)
    })
  }

  function clearRecent() {
    setRecentlyViewed([])
  }

  return { recentlyViewed, addRecentItem, clearRecent }
}