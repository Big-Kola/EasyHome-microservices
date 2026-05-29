import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

const categoryIcons = {
  kitchen: '🍳',
  toilet: '🚽',
  bathroom: '🚿',
  'air-conditioner': '❄️',
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    axios.get(`${API}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
  }, [id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(item => item._id === product._id)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="product-detail">
      <div className="product-detail-image">{categoryIcons[product.category] || '🔧'}</div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        <p className="stock">Stock: {product.stock} units</p>
        <button className="btn btn-success" onClick={addToCart}>
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
