import { useMemo } from 'react'
import { CartContext } from './cart-context'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty, 0),
    [cart]
  )

  const total = useMemo(
    () => cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [cart]
  )

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function placeOrder(details) {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      total,
      ...details,
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    return newOrder
  }

  const value = {
    cart, orders, count, total,
    addToCart, changeQty, removeFromCart, placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}