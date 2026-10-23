import { useEffect, useState } from 'react'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'

function App() {
  // Fetched data and state management
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // Used by ErrorMessage retry button[cite: 5]
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // lines of { item, qty }
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'[cite: 7]
  const [lastOrder, setLastOrder] = useState(null)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const [recentlyViewed, setRecentlyViewed] = useState([])
  // Compute total quantity for the header badge[cite: 5]
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  // Runs after the first render, and again whenever reloadKey changes[cite: 5]
  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        // Keep the vendor the user already picked; otherwise pick the first one[cite: 5].
        setSelectedVendorId((current) => current ?? data[0]?.id ?? null)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort() // cleanup: cancel an old request[cite: 3, 5]
  }, [reloadKey])

function handleAddToCart(item) {
    // Include the vendor name so we can display it in Recently Viewed
    handleViewItem({ ...item, vendorName: selectedVendor.name })

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

  function handleChangeQty(itemId, delta) { // delta is +1 or -1[cite: 6]
    setCart((prev) =>
      prev
        .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0) // qty 0 means the line disappears[cite: 5]
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

// Function that runs whenever an item is viewed/interacted with
function handleViewItem(item) {
  setRecentlyViewed((prev) => {
    // Removes the item if it already exists in the list to prevent duplicates
    const filtered = prev.filter((i) => i.id !== item.id)
    
    // Puts the newly viewed item at the very front (newest first) 
    // and cuts the array to a maximum of 5 items using .slice(0, 5)
    return [item, ...filtered].slice(0, 5)
  })
}

// Function to clear out the recently viewed history completely
function handleClearRecentlyViewed() {
  setRecentlyViewed([])
}

  // Determine what content to render based on view, loading, and error states[cite: 7]
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed.</h2>
        <p><strong>Name:</strong> {lastOrder?.name}</p>
        <p><strong>Mahallah:</strong> {lastOrder?.mahallah}</p>
        <p><strong>Pickup Time:</strong> {lastOrder?.pickupTime}</p>
        <p className="cart-total">Total: RM {lastOrder?.total.toFixed(2)}</p>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          {/* Added Recently Viewed component here so it renders and uses the functions */}
            <RecentlyViewed
              items={recentlyViewed}
              onClear={handleClearRecentlyViewed}
            />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App