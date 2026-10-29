import { Link } from 'react-router'

export default function RecentlyViewed({ items, onClear }) {
  if (!items || items.length === 0) return null

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Recently Viewed</h3>
        <button type="button" className="link danger" onClick={onClear}>
          Clear
        </button>
      </div>
      <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0' }}>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/vendor/${item.vendorId}`}>{item.name}</Link>
            {' '}
            <small style={{ color: '#666' }}>({item.vendorName})</small> - RM {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}