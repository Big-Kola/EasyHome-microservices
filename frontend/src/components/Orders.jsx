import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!token || !user._id) return
    axios.get(`${API}/orders?userId=${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
  }, [])

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h1 className="page-title">My Orders</h1>
        <p style={{ color: '#888' }}>No orders yet.</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <h1 className="page-title">My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Order #{order._id.slice(-8)}</span>
            <span className={`status-badge status-${order.status}`}>{order.status}</span>
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <p key={i}>{item.name} x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}</p>
            ))}
          </div>
          <div style={{ marginTop: 8, fontWeight: 'bold', color: '#1a237e' }}>
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
