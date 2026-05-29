import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const updateQuantity = (id, qty) => {
    const updated = cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, qty) } : item
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const checkout = async () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!token) return alert('Please login first')

    try {
      const items = cart.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      await axios.post(`${API}/orders`, {
        user: user._id,
        items,
        total,
        shippingAddress: 'Default Address',
      }, { headers: { Authorization: `Bearer ${token}` } })
      localStorage.removeItem('cart')
      setCart([])
      alert('Order placed successfully!')
    } catch (err) {
      alert('Error placing order: ' + (err.response?.data?.error || err.message))
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Browse our categories to add items.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)} each</p>
          </div>
          <div className="cart-item-actions">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
            />
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button className="btn btn-danger" onClick={() => removeItem(item._id)} style={{ padding: '6px 12px' }}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="btn btn-success" onClick={checkout}>Place Order</button>
      </div>
    </div>
  )
}
