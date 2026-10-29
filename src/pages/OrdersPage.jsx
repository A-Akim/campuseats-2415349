import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'

export default function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card">
        <h2>My Orders</h2>
        <p className="muted">No orders yet.</p>
        <Link to="/">Browse vendors</Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <h3>Order #{order.id}</h3>
            <p className="muted">{new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mahallah:</strong> {order.mahallah}</p>
            <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty}× {line.item.name} — RM {(line.item.price * line.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}