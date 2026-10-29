import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors'
import { useCart } from '../hooks/useCart'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import MenuList from '../components/MenuList.jsx'

export default function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()
  const { addRecentItem } = useRecentlyViewed()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => String(v.id) === String(id))

  if (!vendor) {
    return (
      <div className="card error">
        <h2>Vendor not found</h2>
        <p>No vendor with ID: <code>{id}</code></p>
        <Link to="/">← Back to vendors</Link>
      </div>
    )
  }

  function handleAdd(item) {
    addToCart(item)
    addRecentItem(item, vendor.id, vendor.name)
  }

  return (
    <>
      <p><Link to="/">← All vendors</Link></p>
      <section>
        <h2 className="section-title">Menu: {vendor.name}</h2>
        <MenuList items={vendor.menu} onAdd={handleAdd} />
      </section>
    </>
  )
}