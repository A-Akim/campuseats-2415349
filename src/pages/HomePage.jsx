import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx'

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { recentlyViewed, clearRecent } = useRecentlyViewed()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <>
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <Link to={`/vendor/${vendor.id}`} key={vendor.id} className="card vendor-card">
              <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
              <div>
                <h3>{vendor.name}</h3>
                <p className="muted">{vendor.location}</p>
                <p className="muted">Open: {vendor.openHours}</p>
                <span className={vendor.isOpen ? 'status open' : 'status closed'}>
                  {vendor.isOpen ? 'Open now' : 'Closed'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Digit 9: Recently Viewed — now persisted with useLocalStorage */}
      <RecentlyViewed items={recentlyViewed} onClear={clearRecent} />
    </>
  )
}