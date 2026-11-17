import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />

  if (orders.length === 0) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>My Orders</h2>
        <p className="muted">No orders yet.</p>
        <Link to="/">Browse vendors</Link>
      </div>
    )
  }

  return (
    <section className="container" style={{ padding: '2rem 1rem' }}>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((order) => (
          <li key={order.id} className="card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <p className="cart-name">
              <strong>{order.vendorName}</strong> · pickup {order.pickupTime}
            </p>
            <p className="muted">
              {order.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
            </p>
            <p className="muted">
              Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            
            {/* Live status tracker */}
            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}

          </li>
        ))}
      </ul>
    </section>
  )
}